import mongoose from "mongoose";
import { ReservationType } from "../types/reservation";

const reservationSchema = new mongoose.Schema<ReservationType>(
    {
        userId: { type: String, required: true },
        resourceId: { type: String, required: true },
        comment: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        size: { type: Number, required: true },
    },
    { timestamps: true, collection: "reservations" }
);

const Reservation = mongoose.model<ReservationType>(
    "Reservation",
    reservationSchema
);

export default Reservation;
