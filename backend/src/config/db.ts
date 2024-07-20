import mongoose from "mongoose";

const connectDB = async () => {
	if (!process.env.MONGODB_URI) {
		console.error("MONGODB_URI is not defined.");
		process.exit(1);
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Could not connect to MongoDB:", error);
		process.exit(1);
	}
};

export default connectDB;
