import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Resource, { ResourceType } from "../models/resource";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

router.post(
	"/",
	verifyToken,
	[
		body("name").notEmpty().withMessage("Name is required"),
		body("location").notEmpty().withMessage("Location is required"),
		body("description").notEmpty().withMessage("Description is required"),
		body("type").notEmpty().withMessage("Type is required"),
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

export default router;
