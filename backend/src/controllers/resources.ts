import Resource from "../models/resource";
import { Request, Response } from "express";
import Reservation from "../models/reservation";

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

// /api/resources/:resourceId/reservations
export const getResourceReservations = async (req: Request, res: Response) => {
	const reservations = await Reservation.find({
		resourceId: req.params.resourceId,
	});

	if (!reservations) {
		return res.status(404).json({ message: "Reservations not found" });
	}

	return res.status(200).json({ reservations });
};
