import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { AppContext } from "../contexts/AppContext";
import { useContext, useState, useMemo } from "react";
import ReservationItem from "../components/Reservation";

const MyReservations = () => {
    const { showToast } = useContext(AppContext);
    const queryClient = useQueryClient();
    const [showPast, setShowPast] = useState(false);
    const [upcomingLimit, setUpcomingLimit] = useState(10);
    const [pastLimit, setPastLimit] = useState(10);

    const { data: reservations } = useQuery(
        "getMyReservations",
        apiClient.getMyReservations,
        {
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" });
            },
        }
    );

    const deleteMutation = useMutation(apiClient.cancelReservation, {
        onSuccess: () => {
            queryClient.invalidateQueries("getMyReservations");
            showToast({ message: "Reservation deleted successfully", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleDelete = (reservationId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this reservation? This action cannot be undone."
        );
        if (isConfirmed) {
            deleteMutation.mutate(reservationId);
        }
    };

    const now = new Date();

    const upcomingReservations = useMemo(() => {
        return reservations
            ?.filter((reservation) => new Date(reservation.start) > now)
            .sort((a, b) => new Date(a.start) - new Date(b.start));
    }, [reservations, now]);

    const pastReservations = useMemo(() => {
        return reservations
            ?.filter((reservation) => new Date(reservation.start) <= now)
            .sort((a, b) => new Date(b.start) - new Date(a.start));
    }, [reservations, now]);

    const loadMoreUpcoming = () => setUpcomingLimit((prev) => prev + 10);
    const loadMorePast = () => setPastLimit((prev) => prev + 10);

    if (!reservations) {
        return <></>;
    }

    return (
        <div className="container mx-auto p-2 my-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl text-primary font-bold">
                    My Reservations
                </h1>
                <Link
                    to="/search"
                    className="rounded text-base md:text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background_alt hover:text-med_orange hover:shadow-lg transition-all"
                >
                    Add Reservation
                </Link>
            </div>

            <div className="mb-2">
                <button
                    onClick={() => setShowPast(!showPast)}
                    className={showPast ? "rounded text-lg text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background_alt hover:text-med_orange hover:shadow-lg transition-all" :
                    "rounded text-lg hover:text-light_neutral hover:bg-med_orange font-bold px-3 py-2 bg-background_alt text-med_orange hover:shadow-lg transition-all"}
                >
                    {showPast ? "Show Upcoming Reservations" : "Show Past Reservations"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
                {!showPast &&
                    upcomingReservations
                        .slice(0, upcomingLimit)
                        .map((reservation) => (
                            <ReservationItem
                                key={reservation._id}
                                reservation={reservation}
                                onDelete={handleDelete}  // Pass the delete handler
                            />
                        ))}
                {showPast &&
                    pastReservations
                        .slice(0, pastLimit)
                        .map((reservation) => (
                            <ReservationItem
                                key={reservation._id}
                                reservation={reservation}
                            />
                        ))}
            </div>

            <div className="mt-6 flex justify-center">
                {!showPast && upcomingReservations.length > upcomingLimit && (
                    <button
                        onClick={loadMoreUpcoming}
                        className="rounded text-md bg-background_alt shadow-lg text-primary italic font-medium px-3 py-2 hover:text-med_orange hover:shadow-lg transition-all"
                    >
                        Load More Upcoming Reservations
                    </button>
                )}
                {showPast && pastReservations.length > pastLimit && (
                    <button
                        onClick={loadMorePast}
                        className="rounded text-md bg-background_alt shadow-lg text-primary italic font-medium px-3 py-2 hover:text-med_orange hover:shadow-lg transition-all"
                    >
                        Load More Past Reservations
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyReservations;
