import User from "../models/user";
import cloudinary from "cloudinary";
import Resource from "../models/resource";
import { Request, Response } from "express";
import Reservation from "../models/reservation";
import { ResourceType } from "../types/resource";
import { validationResult } from "express-validator";
import { convertTimeToMinutes } from "../middleware/time";

// /api/users/profile
export const getProfile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

// /api/users/profile
export const updateProfile = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ message: errors.array().map((error) => error.msg) });
    }

    try {
        const existingUser = await User.findOne({
            userName: req.body.userName,
        });
        if (existingUser && existingUser._id.toString() !== req.userId) {
            return res.status(400).json({ message: "Username taken" });
        }
        const user = await User.findByIdAndUpdate(req.userId, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.save();
        return res.status(200).json({ message: "Profile updated" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// /api/users/profile
export const deleteProfile = async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
};

// /api/users/my-resources
export const getMyResources = async (req: Request, res: Response) => {
    const resources = await Resource.find({ userId: req.userId });
    if (!resources) {
        return res.status(404).json({ message: "No resources found" });
    }

    return res.status(200).json(resources);
};

// /api/users/my-resources/:resourceId
export const getMyResourceById = async (req: Request, res: Response) => {
    const resource = await Resource.findOne({
        _id: req.params.resourceId,
        userId: req.userId,
    });
    if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json(resource);
};

// /api/users/my-resources
export const addResource = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ message: errors.array().map((error) => error.msg) });
    }

    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newResource: ResourceType = req.body;

        const imageUrls = await uploadImages(imageFiles);
        newResource.imageUrls = imageUrls;
        newResource.openMinutes = convertTimeToMinutes(req.body.open);
        newResource.closeMinutes = convertTimeToMinutes(req.body.close);
        newResource.userId = req.userId;
        const resource = new Resource(newResource);

        await resource.save();
        return res.status(201).json({ message: "Resource added" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// /api/users/my-resources/:resourceId
export const updateResource = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ message: errors.array().map((error) => error.msg) });
    }

    try {
        const updatedResource: ResourceType = req.body;
        updatedResource.openMinutes = convertTimeToMinutes(req.body.open);
        updatedResource.closeMinutes = convertTimeToMinutes(req.body.close);
        const resource = await Resource.findOneAndUpdate(
            {
                _id: req.params.resourceId,
                userId: req.userId,
            },
            updatedResource,
            { new: true }
        );

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }
        const currentImagePublicIds = resource.imageUrls.map((url) =>
            extractPublicIdFromUrl(url)
        );

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        resource.imageUrls = [
            ...updatedImageUrls,
            ...(updatedResource.imageUrls || []),
        ];

        for (const publicId of currentImagePublicIds) {
            try {
                await cloudinary.v2.uploader.destroy(publicId);
            } catch (error) {
                console.error(`Failed to delete image ${publicId}:`, error);
            }
        }

        await resource.save();
        return res.status(200).json({ message: "Resource updated" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// /api/users/my-resources/:resourceId
export const deleteResource = async (req: Request, res: Response) => {
    const deletedResource = await Resource.findByIdAndDelete(
        req.params.resourceId
    );

    if (!deletedResource) {
        return res.status(404).json({ message: "Resource not found" });
    }

    const imagePublicIds = deletedResource.imageUrls.map((url) =>
        extractPublicIdFromUrl(url)
    );

    for (const publicId of imagePublicIds) {
        try {
            await cloudinary.v2.uploader.destroy(publicId);
        } catch (error) {
            console.error(`Failed to delete image ${publicId}:`, error);
        }
    }

    return res.status(200).json({ message: "Resource deleted" });
};

// /api/users/my-reservations
export const getMyReservations = async (req: Request, res: Response) => {
    const reservations = await Reservation.find({ userId: req.userId });
    if (!reservations) {
        return res.status(404).json({ message: "No reservations found" });
    }

    return res.status(200).json(reservations);
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = `data:${file.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

function extractPublicIdFromUrl(url: string): string {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split(".")[0];
    return publicId;
}
