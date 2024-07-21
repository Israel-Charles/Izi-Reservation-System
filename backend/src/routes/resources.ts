import express from "express";
import {
    searchResources,
    getResourceById,
    getResourceReservations,
} from "../controllers/resources";

const router = express.Router();

router.get("/search", searchResources);
router.get("/:resourceId", getResourceById);
router.get("/:resourceId/reservations", getResourceReservations);

export default router;
