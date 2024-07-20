import User from "../models/user";
import Resource from "../models/resource";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

// /api/users/profile
export const getProfile = async (req: Request, res: Response) => {
	const user = await User.findById(req.userId).select("-password");
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ user });
};

// /api/users/profile/update
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

	try {
		await user.save();
		return res.status(200).json({ message: "Profile updated" });
	} catch (error) {
		return res.status(500).json({ message: "Server error" });
	}
};

// /api/users/delete
export const deleteUser = async (req: Request, res: Response) => {
	const user = await User.findByIdAndDelete(req.userId);
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	return res.status(200).json({ message: "User deleted" });
};

// /api/users/my-resources
export const getMyResources = async (req: Request, res: Response) => {
	const resources = await Resource.find({ userId: req.userId });
	if (!resources) {
		return res.status(404).json({ message: "No resources found" });
	}

	return res.status(200).json({ resources });
};

// /api/users/my-resources/add
export const addResource = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		name,
		location,
		description,
		maxResLen,
		maxResSize,
		type,
		open,
		close,
		days,
		// imageUrls,
	} = req.body;

	const existingResource = await Resource.findOne({ name });
	if (existingResource) {
		return res.status(400).json({ message: "Resource name taken" });
	}

	const newResource = new Resource({
		userId: req.userId,
		name,
		location,
		description,
		maxResLen,
		maxResSize,
		type,
		open,
		close,
		days,
		// imageUrls,
	});

	try {
		await newResource.save();
		return res.status(201).json({ message: "Resource added" });
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
};

// /api/users/my-resources/edit/:resourceId
export const editResource = async (req: Request, res: Response) => {
	const resource = await Resource.findById(req.params.resourceId);
	if (!resource) {
		return res.status(404).json({ message: "Resource not found" });
	}
	if (resource.userId.toString() !== req.userId) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		name,
		location,
		description,
		maxResLen,
		maxResSize,
		type,
		open,
		close,
		days,
		// imageUrls,
	} = req.body;

	const existingName = await Resource.findOne({ name });
	if (existingName) {
		return res.status(400).json({ message: "Resource name taken" });
	}

	const updatedResource = await Resource.findByIdAndUpdate(
		req.params.resourceId,
		{
			name,
			location,
			description,
			maxResLen,
			maxResSize,
			type,
			open,
			close,
			days,
			// imageUrls,
		},
		{ new: true }
	);
	if (!updatedResource) {
		return res.status(404).json({ message: "Resource not found" });
	}

	try {
		await updatedResource.save();
		return res.status(200).json({ message: "Resource updated" });
	} catch (error) {
		return res.status(500).json({ message: "Server error" });
	}
};

// /api/users/my-resources/delete/:resourceId
export const deleteResource = async (req: Request, res: Response) => {
	const resource = await Resource.findById(req.params.resourceId);
	if (!resource) {
		return res.status(404).json({ message: "Resource not found" });
	}
	if (resource.userId.toString() !== req.userId) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	const deletedResource = await Resource.findByIdAndDelete(
		req.params.resourceId
	);
	if (!deletedResource) {
		return res.status(404).json({ message: "Resource not found" });
	}

	return res.status(200).json({ message: "Resource deleted" });
};

// /api/users/my-reservations
export const getMyReservations = async (req: Request, res: Response) => {};

// /api/users/my-reservations/cancel/:reservationId
export const cancelReservation = async (req: Request, res: Response) => {};
