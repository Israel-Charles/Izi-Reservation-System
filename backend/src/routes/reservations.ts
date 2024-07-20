import express from "express";
import authenticate from "../middleware/authenticate";
import { validateReservation } from "../middleware/reservation.validation";
import {
	makeReservation,
	getReservationById,
	cancelReservation,
} from "../controllers/reservations";

const router = express.Router();

router.post("/:resourceId", authenticate, validateReservation, makeReservation);
router.get("/:reservationId", authenticate, getReservationById);
router.delete("/:reservationId", authenticate, cancelReservation);

export default router;
