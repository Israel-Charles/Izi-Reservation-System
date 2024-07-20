import { Request, Response } from "express";
import Reservation from "../models/reservation";

// /api/reservations/:resourceId
export const getResourceReservations = async (req: Request, res: Response) => {
	const reservations = await Reservation.find({
		resourceId: req.params.resourceId,
	});
	return res.status(200).json({ reservations });
};

// /api/reservations/:reservationId
export const getReservationById = async (req: Request, res: Response) => {
	const reservation = await Reservation.findById(req.params.reservationId);
	return res.status(200).json({ reservation });
};
