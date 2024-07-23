import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

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
            <div className="grid grid-cols-1 gap-8">
                {reservationData.map((reservation) => (
                    <div
                        key={reservation._id}
                        className="flex flex-col bg-background_alt text-primary justify-between rounded-lg p-6 gap-6 shadow-lg"
                    >
                        <h2 className="whitespace-pre-line">
                            {reservation.comment}
                        </h2>
                        <div className="whitespace-pre-line">
                            {reservation.start}
                        </div>
                        <div className="whitespace-pre-line">
                            {reservation.end}
                        </div>
                        <div className="whitespace-pre-line">
                            {reservation.size}
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <Link
                                to={`/reserve/${resource._id}`}
                                className="rounded text-xl text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all"
                            >
                                View
                            </Link>
                            <Link
                                to={`/my-resources/${resource._id}`}
                                className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all"
                            >
                                Edit
                            </Link>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReservations;
