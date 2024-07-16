import express, { Request, Response } from "express";
import Resource from "../models/resource";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
	try {
		const pageSize = 5;
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : "1"
		);
		const skip = (pageNumber - 1) * pageSize;

		const resources = await Resource.find().skip(skip).limit(pageSize);
		const total = await Resource.countDocuments();

		const response = {
			data: resources,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};

		res.json(response);
	} catch (error) {
		console.log("error", error);
		res.status(500).json({ message: "Something went wrong" });
	}
});

export default router;
