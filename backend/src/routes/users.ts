import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

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
			let user = await User.findOne({ email: req.body.email });
			if (user)
				return res
					.status(400)
					.json({ message: "Email belongs to an existing account" });

			user = await User.findOne({ userName: req.body.userName });
			if (user) return res.status(400).json({ message: "Username is taken" });

			user = new User(req.body);
			await user.save();

			const token = jwt.sign(
				{ userId: user._id },
				process.env.JWT_SECRET_KEY as string,
				{ expiresIn: "1d" }
			);
			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 86400000,
			});
			return res.status(200).send({ message: "User registered successfully" });
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: "Something went wrong" });
		}
	}
);

export default router;
