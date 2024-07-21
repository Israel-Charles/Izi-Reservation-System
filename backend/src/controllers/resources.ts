import Resource from "../models/resource";
import { Request, Response } from "express";
import Reservation from "../models/reservation";
import { ResourceSearchResponse } from "../types/resource";

// /api/resources/search
export const searchResources = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;

        const resources = await Resource.find().skip(skip).limit(pageSize);

        const total = await Resource.countDocuments();

        const response: ResourceSearchResponse = {
            data: resources,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        console.log("search error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// /api/resources/:resourceId
export const getResourceById = async (req: Request, res: Response) => {
    const resource = await Resource.findById(req.params.resourceId);
    if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json(resource);
};

// /api/resources/:resourceId/reservations
export const getResourceReservations = async (req: Request, res: Response) => {
    const reservations = await Reservation.find({
        resourceId: req.params.resourceId,
    });
    if (!reservations) {
        return res.status(404).json({ message: "Reservations not found" });
    }

    return res.status(200).json(reservations);
};
