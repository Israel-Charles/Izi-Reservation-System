import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import WeeklyView from "../components/WeeklyView";
import ReservationForm from "../forms/ReservationForm/ReservationForm";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Reserve = () => {
    const { resourceId } = useParams();
    const { data: resource } = useQuery(
        "getResourceById",
        () => apiClient.getResourceById(resourceId as string),
        { enabled: !!resourceId }
    );
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % resource.imageUrls.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) =>
                (prevIndex - 1 + resource.imageUrls.length) %
                resource.imageUrls.length
        );
    };

    if (!resource) {
        return <></>;
    }

    return (
        <div className="container mx-auto p-6 my-14">
            <div className="flex flex-col gap-y-6 bg-background_alt rounded-lg shadow-lg p-6 text-primary">
                <div className="flex flex-row gap-6 justify-between">
                    <div>
                        <div className="flex justify-start items-center gap-3">
                            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                                {resource.name}
                            </span>
                            <span className="text-sm md:text-base lg:text-lg text-secondary">
                                {resource.type}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-base md:text-lg lg:text-xl text-secondary">
                                {resource.location}
                            </span>
                            <div className="flex justify-start items-center gap-3">
                                <span className="text-sm md:text-base text-secondary">
                                    {resource.days.join(", ")}
                                </span>
                                <span className="text-sm md:text-base text-secondary">
                                    {resource.open} - {resource.close}
                                </span>
                            </div>
                            <span className="text-sm md:text-base text-secondary">
                                {resource.description}
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        {resource.imageUrls.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-3 z-10"
                                >
                                    <FaArrowAltCircleLeft className="text-light_neutral size-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-3 z-10"
                                >
                                    <FaArrowAltCircleRight className="text-light_neutral size-6" />
                                </button>
                            </>
                        )}
                        <img
                            key={resource.imageUrls[currentImageIndex]}
                            src={resource.imageUrls[currentImageIndex]}
                            alt="Resource"
                            className="rounded-lg w-[300px] h-[200px] object-cover"
                        />
                    </div>
                </div>
                <WeeklyView
                    open={resource.open}
                    close={resource.close}
                    resourceId={resourceId}
                />
                <ReservationForm
                    open={resource.open}
                    close={resource.close}
                    maxResSize={resource.maxResSize}
                    resourceId={resourceId}
                />
            </div>
        </div>
    );
};

export default Reserve;
