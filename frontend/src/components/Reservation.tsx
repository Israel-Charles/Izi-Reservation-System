import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { format } from "date-fns";
import {
    FaMapPin,
    FaUsers,
    FaRegClock,
    FaCalendarAlt,
} from "react-icons/fa";

function useResourceById(resourceId) {
    return useQuery(
        ["getResourceById", resourceId],
        () => apiClient.getResourceById(resourceId),
        {
            enabled: !!resourceId,
        }
    );
}

const ReservationItem = ({ reservation, onDelete }) => {
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
            className="flex flex-row justify-between bg-background_alt text-primary rounded-lg p-3 gap-2 shadow-lg"
        >
            <div className="flex flex-col justify-between">
                <div className="pb-2">
                    <h2 className="font-semibold text-lg">{resource?.name}</h2>
                    <div className="italic text-sm text-secondary">
                        {resource?.type}
                    </div>
                    <span className="grid grid-rows-1 grid-flow-col justify-start text-sm text-secondary">
                        <FaMapPin className="mr-2 pt-1 size-4" />
                        <span className="flex flex-wrap">
                            {resource?.location}
                        </span>
                    </span>
                </div>
                <span className="grid grid-rows-1 grid-flow-col justify-start text-sm text-secondary">
                    <FaUsers className="mr-2 pt-1 size-4" />
                    <span className="flex flex-wrap">
                        Group Size: {reservation.size}
                    </span>
                </span>
                <span className="grid grid-rows-1 grid-flow-col justify-start text-sm text-secondary">
                    <FaCalendarAlt className="mr-2 pt-1 size-4" />
                    <span className="flex flex-wrap">
                        {formattedDate}
                    </span>
                </span>
                <span className="grid grid-rows-1 grid-flow-col justify-start text-sm text-secondary pb-2">
                    <FaRegClock className="mr-2 pt-1 size-4" />
                    <span className="flex flex-wrap">
                    From {formattedStart} to {formattedEnd}
                    </span>
                </span>
                <h2 className="italic font-medium">{reservation.comment}</h2>
            </div>
            <div className="flex flex-col justify-between w-2/5">
                {resource?.imageUrls && (
                    <div className="flex-shrink-0">
                        <img
                            src={resource.imageUrls[0]}
                            alt={resource.name}
                            className="h-24 w-full object-cover rounded-lg"
                        />
                    </div>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(reservation._id)}
                        className="text-sm rounded mt-2 text-nowrap text-light_neutral bg-error font-semibold px-2 py-2 hover:bg-background_alt hover:text-error hover:shadow-lg transition-all disabled:bg-background_alt disabled:pointer-events-none"
                    >
                        Delete Reservation
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReservationItem;
