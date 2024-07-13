import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Resource from "../models/resource";
import { ResourceType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

router.post(
	"/",
	verifyToken,
	[
		body("name").notEmpty().withMessage("Name is required"),
		body("location").notEmpty().withMessage("Location is required"),
		body("description").notEmpty().withMessage("Description is required"),
		body("maxResLen").isInt({ min: 1 }).withMessage("Max Resource Length must be a positive integer"),
		body("maxResSize").isInt({ min: 1 }).withMessage("Max Resource Size must be a positive integer"),
		body("type").notEmpty().withMessage("Type is required"),
		body("open").notEmpty().withMessage("Open time is required"),
		body("close").notEmpty().withMessage("Close time is required"),
		body("days").isArray({ min: 1 }).withMessage("Days must be an array with at least one element"),
		body("lastUpdated").isISO8601().toDate().withMessage("Last updated must be a valid ISO8601 date"),
	],
	upload.array("imageFiles", 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[];
			const newResource: ResourceType = req.body;

			const uploadPromises = imageFiles.map(async (image) => {
				const b64 = Buffer.from(image.buffer).toString("base64");
				let dataURI = `data:${image.mimetype};base64,${b64}`;
				const res = await cloudinary.v2.uploader.upload(dataURI);
				return res.url;
			});

			const imageUrls = await Promise.all(uploadPromises);
			newResource.imageFiles = imageUrls;
			newResource.lastUpdated = new Date();
			newResource.userId = req.userId;

			const resource = new Resource(newResource);
			await resource.save();
			res.status(201).send(resource);
		} catch (error) {
			console.log("Error creating resource: ", error);
			res.status(500).json({ message: "Something went wrong" });
		}
	}
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
	try {
		const resources = await Resource.find({ userId: req.userId });
		res.json(resources);
	} catch (error) {
		res.status(500).json({ message: "Error fetching resources" });
	}
});

export default router;
