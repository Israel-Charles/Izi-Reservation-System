import mongoose from "mongoose";
import { ReservationType } from "../shared/types";

const reservationSchema = new mongoose.Schema<ReservationType>({
	userId: { type: String, required: true },
	resourceId: { type: String, required: true },
	comment: { type: String, required: true },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	groupSize: { type: Number, required: true },
	lastUpdated: { type: Date, required: true },
});

const Reservation = mongoose.model<ReservationType>(
	"Reservation",
	reservationSchema
);

export default Reservation;
