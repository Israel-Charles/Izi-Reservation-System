import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Could not connect to MongoDB:", error);
		process.exit(1);
	}
};

export default connectDB;
