import { Request, Response } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";

// /api/users/profile
export const getProfile = async (req: Request, res: Response) => {
	const user = await User.findById(req.userId).select("-password");

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ user });
};

// /api/users/profile
export const updateProfile = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { firstName, lastName, userName } = req.body;

	const existingUser = await User.findOne({ userName });

	if (existingUser && existingUser._id.toString() !== req.userId) {
		return res.status(400).json({ message: "Username taken" });
	}

	const user = await User.findByIdAndUpdate(
		req.userId,
		{ firstName, lastName, userName },
		{ new: true }
	);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	await user.save();

	return res.status(200).json({ message: "Profile updated" });
};
