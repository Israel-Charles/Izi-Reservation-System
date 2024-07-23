// ReservationItem.tsx
import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { format } from "date-fns";

function useResourceById(resourceId) {
    return useQuery(
        ["getResourceById", resourceId],
        () => apiClient.getResourceById(resourceId),
        {
            enabled: !!resourceId,
        }
    );
}

const ReservationItem = ({ reservation }) => {
    const {
        data: resource,
        isLoading,
        isError,
    } = useResourceById(reservation.resourceId);

    if (isLoading) return <div>Loading resource...</div>;
    if (isError) return <div>Error loading resource.</div>;

    const formattedStart = format(new Date(reservation.start), "p");
    const formattedEnd = format(new Date(reservation.end), "p");
    const formattedDate = format(new Date(reservation.start), "EEEE, MMMM do, yyyy");


    return (
        <div
            key={reservation._id}
            className="flex flex-row justify-between bg-background_alt text-primary rounded-lg p-6 gap-6 shadow-lg"
        >
            <div className="flex flex-col justify-between">
                <h2 className="whitespace-pre-line font-semibold">{resource?.name}</h2>
                <br></br>
                <h2 className="whitespace-pre-line italic">{reservation.comment}</h2>
                <br></br>
                <h2 className="whitespace-pre-line">{formattedDate}</h2>

                <div className="whitespace-pre-line">
                    From {formattedStart} to {formattedEnd}
                </div>
            </div>
            {resource?.imageUrls && (
                <div className="flex-shrink-0">
                    <img
                        src={resource.imageUrls[0]}
                        alt={resource.name}
                        className="h-24 w-24 object-cover rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default ReservationItem;
