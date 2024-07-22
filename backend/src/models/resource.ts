import mongoose from "mongoose";
import { ResourceType } from "../types/resource";

const resourceSchema = new mongoose.Schema<ResourceType>(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        maxResLen: { type: Number, required: true },
        maxResSize: { type: Number, required: true },
        type: { type: String, required: true },
        open: { type: String, required: true },
        openMinutes: { type: Number, required: true },
        close: { type: String, required: true },
        closeMinutes: { type: Number, required: true },
        days: [{ type: String, required: true }],
        imageUrls: [{ type: String, required: true }],
    },
    { timestamps: true, collection: "resources" }
);

const Resource = mongoose.model<ResourceType>("Resource", resourceSchema);

export default Resource;
