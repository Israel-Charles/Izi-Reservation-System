import express from "express";
import {
    searchResources,
    getResourceById,
    getResourceReservations,
    getUserNameById,
} from "../controllers/resources";

const router = express.Router();

router.get("/search", searchResources);
router.get("/:resourceId", getResourceById);
router.get("/:resourceId/reservations", getResourceReservations);
router.get("/:userId/name", getUserNameById);

export default router;
