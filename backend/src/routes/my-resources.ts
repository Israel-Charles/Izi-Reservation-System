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
		body("maxResLen")
			.isInt({ min: 1 })
			.withMessage("Max Resource Length must be a positive number"),
		body("maxResSize")
			.isInt({ min: 1 })
			.withMessage("Max Resource Size must be a positive number"),
		body("type").notEmpty().withMessage("Type is required"),
		body("open").notEmpty().withMessage("Open time is required"),
		body("close").notEmpty().withMessage("Close time is required"),
		body("days")
			.isArray({ min: 1 })
			.withMessage("Must select at least one day"),
	],
	upload.array("imageFiles", 6),
	async (req: Request, res: Response) => {
		try {
			let resource = await Resource.findOne({ name: req.body.name });
			if (resource)
				return res
					.status(400)
					.json({ message: "Resource of this name already exists" });

			const imageFiles = req.files as Express.Multer.File[];
			const newResource: ResourceType = req.body;

			const imageUrls = await uploadImages(imageFiles);

			newResource.imageUrls = imageUrls;
			newResource.lastUpdated = new Date();
			newResource.userId = req.userId;

			resource = new Resource(newResource);
			await resource.save();
			res.status(201).send(resource);
		} catch (error) {
			console.log(error);
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

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
	const id = req.params.id.toString();
	try {
		const resource = await Resource.findById({ _id: id, userId: req.userId });
		res.json(resource);
	} catch (error) {
		res.status(500).json({ message: "Error fetching resource" });
	}
});

router.put(
	"/:resourceId",
	verifyToken,
	upload.array("imageFiles"),
	async (req: Request, res: Response) => {
		try {
			const updatedResource: ResourceType = req.body;
			updatedResource.lastUpdated = new Date();

			const existingName = await Resource.findOne({ name: req.body.name });
			if (existingName && existingName._id.toString() !== req.params.resourceId)
				return res
					.status(400)
					.json({ message: "Resource with this name already exists" });

			const resource = await Resource.findOneAndUpdate(
				{ _id: req.params.resourceId, userId: req.userId },
				updatedResource,
				{ new: true }
			);

			if (!resource) {
				return res.status(404).json({ message: "Resource not found" });
			}

			const files = req.files as Express.Multer.File[];
			const updatedImageUrls = await uploadImages(files);

			resource.imageUrls = [
				...updatedImageUrls,
				...(updatedResource.imageUrls || []),
			];

			await resource.save();
			res.status(201).json(resource);
		} catch (error) {
			res.status(500).json({ message: "Error updating resource" });
		}
	}
);

export default router;

async function uploadImages(imageFiles: Express.Multer.File[]) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString("base64");
		let dataURI = `data:${image.mimetype};base64,${b64}`;
		const res = await cloudinary.v2.uploader.upload(dataURI);
		return res.url;
	});

	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}
