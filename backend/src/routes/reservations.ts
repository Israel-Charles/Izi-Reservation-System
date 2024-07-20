import express from "express";
import {
	getResourceReservations,
	getReservationById,
} from "../controllers/reservations";

const router = express.Router();

router.get("/:resourceId", getResourceReservations);
router.get("/:reservationId", getReservationById);

export default router;
