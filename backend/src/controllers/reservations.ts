import Resource from "../models/resource";
import { Request, Response } from "express";
import Reservation from "../models/reservation";
import { validationResult } from "express-validator";
import { convertTimeToMinutes } from "../middleware/time";

// /api/reservations/:resourceId
export const makeReservation = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ message: errors.array().map((error) => error.msg) });
    }

    try {
        const resource = await Resource.findById(req.params.resourceId);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        const { comment, start, end, size } = req.body;
        const reservation = new Reservation({
            userId: req.userId,
            resourceId: req.params.resourceId,
            comment,
            start,
            end,
            size,
        });

        await reservation.save();
        return res.status(201).json({ message: "Reservation created" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// /api/reservations/:reservationId
export const getReservationById = async (req: Request, res: Response) => {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(reservation);
};

// /api/reservations/:reservationId
export const cancelReservation = async (req: Request, res: Response) => {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    const deletedReservation = await Reservation.findByIdAndDelete(
        req.params.reservationId
    );
    if (!deletedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ message: "Reservation cancelled" });
};
