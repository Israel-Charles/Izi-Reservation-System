import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import ReservationItem from "../components/Reservation";

const MyReservations = () => {
    const { showToast } = useContext(AppContext);

    const { data: reservationData } = useQuery(
        "getMyReservations",
        apiClient.getMyReservations,
        {
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" });
            },
        }
    );

    if (!reservationData) {
        return <></>;
    }

    return (
        <div className="container mx-auto p-6 my-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl text-primary font-bold">
                    My Reservations
                </h1>
                <Link
                    to="/search"
                    className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background_alt hover:text-med_orange hover:shadow-lg transition-all"
                >
                    Add Reservation
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-8">
                {reservationData.map((reservation) => (
                    <ReservationItem
                        key={reservation._id}
                        reservation={reservation}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyReservations;
