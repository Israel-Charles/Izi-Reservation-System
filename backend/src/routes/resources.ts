import express from "express";
import { getAllResources, getResourceById } from "../controllers/resources";

const router = express.Router();

router.get("/api/resources", getAllResources);
router.get("/api/resources/:resourceId", getResourceById);

export default router;
