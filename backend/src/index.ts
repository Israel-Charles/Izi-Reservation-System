import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth";
import reservationsRoutes from "./routes/reservations";
import resourcesRoutes from "./routes/resources";
import usersRoutes from "./routes/users";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/users", usersRoutes);

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV === "development") {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
} else {
	// Production or other environments configuration
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
