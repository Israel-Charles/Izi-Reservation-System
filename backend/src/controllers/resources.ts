import { Request, Response } from "express";
import Resource from "../models/resource";

// /api/resources
export const getAllResources = async (req: Request, res: Response) => {
	const resources = await Resource.find();
	return res.status(200).json({ resources });
};

// /api/resources/:resourceId
export const getResourceById = async (req: Request, res: Response) => {
	const resource = await Resource.findById(req.params.resourceId);
	return res.status(200).json({ resource });
};
