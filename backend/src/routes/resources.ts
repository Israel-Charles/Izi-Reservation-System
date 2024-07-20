import express from "express";
import {
	getAllResources,
	getResourceById,
	getResourceReservations,
} from "../controllers/resources";

const router = express.Router();

router.get("/", getAllResources);
router.get("/:resourceId", getResourceById);
router.get("/:resourceId/reservations", getResourceReservations);

export default router;
