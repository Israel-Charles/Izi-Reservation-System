import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response } from "express";
import { sendEmail } from "../middleware/sendEmail";
import { validationResult } from "express-validator";

// /api/auth/register
export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingUser = await User.findOne({
            userName: req.body.userName,
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username taken" });
        }

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email belongs to existing account" });
        }

        const newUser = new User({
            ...req.body,
            verificationToken: crypto.randomBytes(16).toString("hex"),
        });

        const url = `${process.env.FRONTEND_URL}/email/verify/${newUser.verificationToken}`;
        const { error } = await sendEmail({
            to: newUser.email,
            subject: "Verify Email Address",
            text: `Click on the link to verify your email address: ${url}`,
            html: `<!doctype html><html lang="en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><title>Verify Email Address Email Template</title><meta name="description" content="Verify Email Address Email Template."><style type="text/css">a:hover{text-decoration:underline!important}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #111827;" leftmargin="0"><!--100%body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#111827" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"><tr><td><table style="background-color: #111827; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td style="height:80px;">&nbsp;</td></tr>
		<tr><td style="text-align:center;"><img src="https://i.ibb.co/vZhSWrt/4331-Booking-Logo.png" alt="4331-Booking Logo" /></td></tr><tr><td style="height:20px;">&nbsp;</td></tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#f2f3f8; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr><td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Please verify your email address</h1><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Click on the following link to verify your email address.</p><a target="_blank" href="${url}" style="background:#ff7d28;text-decoration:none !important; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email Address</a></td></tr><tr><td style="height:40px;">&nbsp;</td></tr></table></td><tr><td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"></p></td></tr><tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table><!--/100%body table--></body></html>`,
        });
        if (error) {
            console.error("Error sending email: ", error);
            return res
                .status(500)
                .json({ message: "Failed to send verification email" });
        }

        await newUser.save();
        res.status(201).json({
            message: `User registered, please verify email sent to: ${newUser.email}`,
            verificationToken: newUser.verificationToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// /api/auth/email/verify/:verificationToken
export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            verificationToken: req.params.verificationToken,
        });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Invalid verification token" });
        }

        user.verified = true;
        user.verificationToken = "";

        await user.save();
        res.status(200).json({ message: "Email verified" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// /api/auth/login
export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.identifier },
                { userName: req.body.identifier },
            ],
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!user.verified) {
            return res
                .status(401)
                .json({ message: "Verify email address before logging in" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1y" }
        );

        const userData = {
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 31536000000,
        });

        return res.status(200).json({ message: "Logged in", user: userData });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// /api/auth/logout
export const logout = async (req: Request, res: Response) => {
    if (!req.cookies.auth_token) {
        return res.status(401).json({ message: "Already logged out" });
    }
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logged out" });
};

// /api/auth/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.resetToken = crypto.randomBytes(20).toString("hex");
        const url = `${process.env.FRONTEND_URL}/password/reset/${user.resetToken}`;
        const { error } = await sendEmail({
            to: req.body.email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click on the link to reset your password: ${url}`,
            html: `<!doctype html><html lang="en-US"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><title>Reset Password Email Template</title><meta name="description" content="Reset Password Email Template."><style type="text/css">a:hover{text-decoration:underline!important}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #111827;" leftmargin="0"><!--100%body table--><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#111827" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"><tr><td><table style="background-color: #111827; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td style="height:80px;">&nbsp;</td></tr>
		<tr><td style="text-align:center;"><img src="https://i.ibb.co/vZhSWrt/4331-Booking-Logo.png" alt="4331-Booking Logo" /></td></tr><tr><td style="height:20px;">&nbsp;</td></tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#f2f3f8; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr><td style="height:40px;">&nbsp;</td></tr><tr><td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested to reset your password</h1><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;">A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.</p><a target="_blank" href="${url}" style="background:#ff7d28;text-decoration:none !important; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a></td></tr><tr><td style="height:40px;">&nbsp;</td></tr></table></td><tr><td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"></p></td></tr><tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table><!--/100%body table--></body></html>`,
        });
        if (error) {
            console.error("Error sending email: ", error);
            return res.status(500).json({
                message: "Failed to send reset email",
            });
        }

        await user.save();
        return res.status(200).json({
            message: "Reset password email sent",
            resetToken: user.resetToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// /api/auth/password/reset/:resetToken
export const resetPassword = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ resetToken: req.params.resetToken });
        if (!user) {
            return res.status(404).json({ message: "Invalid reset token" });
        }

        user.password = req.body.password;
        user.resetToken = "";
        await user.save();

        res.status(200).json({ message: "Password reset" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
