import express from "express";
import {
	addReservation,
	getAllReservations,
	getReservationById,
	updateReservation,
	cancelReservation,
} from "../controllers/reservations";

const router = express.Router();

router.post("/api/resources/:resourceId/reservations", addReservation);
router.get("/api/resources/:resourceId/reservations", getAllReservations);
router.get(
	"/api/resources/:resourceId/reservations/:reservationId",
	getReservationById
);
router.put(
	"/api/resources/:resourceId/reservations/:reservationId",
	updateReservation
);
router.delete(
	"/api/resources/:resourceId/reservations/:reservationId",
	cancelReservation
);

export default router;
