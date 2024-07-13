import mongoose from "mongoose";

export type ReservationType = {
	_id: string;
	userId: string;
	resourceId: string;
	comment: string;
	groupSize: number;
	start: Date;
	end: Date;
	lastUpdated: Date;
};

const reservationSchema = new mongoose.Schema<ReservationType>({
	userId: { type: String, required: true },
	resourceId: { type: String, required: true },
	comment: { type: String, required: false },
	groupSize: { type: Number, required: true },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	lastUpdated: { type: Date, required: true },
});

const Reservation = mongoose.model<ReservationType>("Reservation", reservationSchema);

export default Reservation;
