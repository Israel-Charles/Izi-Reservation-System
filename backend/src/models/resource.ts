import mongoose from "mongoose";

export type ResourceType = {
	_id: string;
	userId: string;
	name: string;
	location: string;
	description: string;
	maxResLen: number;
	maxResSize: number;
	type: string;
	open: Date;
	close: Date;
	days: string[];
	imageFiles: string[];
	lastUpdated: Date;
};

const resourceSchema = new mongoose.Schema<ResourceType>({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	location: { type: String, required: true },
	description: { type: String, required: true },
	maxResLen: { type: Number, required: true },
	maxResSize: { type: Number, required: true },
	type: { type: String, required: true },
	open: { type: Date, required: true },
	close: { type: Date, required: true },
	days: { type: [String], required: true },
	imageFiles: { type: [String], required: true },
	lastUpdated: { type: Date, required: true },
});

const Resource = mongoose.model<ResourceType>("Resource", resourceSchema);

export default Resource;
