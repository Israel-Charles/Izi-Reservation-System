import express, { Request, Response } from "express";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import sendConfirmationEmail from "../middleware/mail";
import crypto from "crypto";

const router = express.Router();

router.post(
	"/register",
	[
		check("firstName", "First name is required").notEmpty(),
		check("lastName", "Last name is required").notEmpty(),
		check("userName", "Username is required").notEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password must be at least 6 characters long").isLength({
			min: 6,
		}),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}

		try {
			let user = await User.findOne({ userName: req.body.userName });
			if (user) return res.status(400).json({ message: "Username is taken" });

			user = await User.findOne({ email: req.body.email });
			if (user)
				return res
					.status(400)
					.json({ message: "Email belongs to an existing account" });

			user = new User({
				...req.body,
				verificationToken: crypto.randomBytes(64).toString("hex"),
			});
			await user.save();

			sendConfirmationEmail(
				user.email,
				user.userName,
				`${process.env.FRONTEND_URL}/confirm/${user._id}`
			);

			return res.status(200).json({
				message: `User registered successfully, please confirm email sent to: ${user.email} to login`,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Something went wrong" });
		}
	}
);

router.post("/confirm/:id", async (req: Request, res: Response) => {
	const verificationToken = req.body.verificationToken;
	try {
		const user = await User.findOne({ verificationToken });
		if (!user) return res.status(404).json({ message: "User not found" });

		user.verified = true;
		await user.save();

		res.status(200).json({ message: "Email confirmed, you can now login" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
