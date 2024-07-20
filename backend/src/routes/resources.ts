import express from "express";
import { getAllResources, getResourceById } from "../controllers/resources";

const router = express.Router();

router.get("/", getAllResources);
router.get("/:resourceId", getResourceById);

export default router;
