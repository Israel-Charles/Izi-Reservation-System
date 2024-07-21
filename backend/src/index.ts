import "dotenv/config";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import resourcesRoutes from "./routes/resources";
import reservationsRoutes from "./routes/reservations";
import express, { Request, Response, NextFunction } from "express";

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/users", usersRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
