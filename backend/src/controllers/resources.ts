import Resource from "../models/resource";
import { Request, Response } from "express";
import Reservation from "../models/reservation";
import { ResourceSearchResponse } from "../types/resource";

// /api/resources/search
export const searchResources = async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "maxResLen":
                sortOptions = { maxResLen: 1 };
                break;
            case "maxResSize":
                sortOptions = { maxResSize: 1 };
                break;
            case "open":
                sortOptions = { open: 1 };
                break;
            case "close":
                sortOptions = { close: 1 };
                break;
        }

        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );
        const skip = (pageNumber - 1) * pageSize;

        const resources = await Resource.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        const total = await Resource.countDocuments(query);

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

const constructSearchQuery = (queryParams: any) => {
    let searchQuery: any = {};

    if (queryParams.name) {
        searchQuery.name = new RegExp(queryParams.name.toString(), "i");
    }

    if (queryParams.location) {
        searchQuery.location = new RegExp(queryParams.location.toString(), "i");
    }

    if (queryParams.type) {
        searchQuery.type = {
            $in: Array.isArray(queryParams.type)
                ? queryParams.type
                : [queryParams.type],
        };
    }

    if (queryParams.maxResLen) {
        searchQuery.maxResLen = { $gte: queryParams.maxResLen };
    }

    if (queryParams.maxResSize) {
        searchQuery.maxResSize = { $gte: queryParams.maxResSize };
    }

    if (queryParams.days) {
        searchQuery.days = {
            $all: Array.isArray(queryParams.days)
                ? queryParams.days
                : [queryParams.days],
        };
    }

    // if (queryParams.open) {
    //     searchQuery.open = { $lte: queryParams.open };
    // }

    // if (queryParams.close) {
    //     searchQuery.close = { $gte: queryParams.close };
    // }

    return searchQuery;
};
