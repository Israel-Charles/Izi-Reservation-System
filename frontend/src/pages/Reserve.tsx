import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import ReserveCalendarView from "../components/ReserveCalendarView";
import { BackButton } from "../components/Buttons";
import {
    FaMapPin,
    FaUsers,
    FaRegClock,
    FaCalendarAlt,
} from "react-icons/fa";

import { LuTimer } from "react-icons/lu";
import { stringToTime } from "../utilFunction";


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

    // Reset scroll position when the component is mounted or when resourceId changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [resourceId]);

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
        <div className="container mx-auto p-0 my-6">
            <div className="flex flex-col gap-y-6 bg-background_alt rounded-lg shadow-lg p-4 text-primary">
                <div className="hidden md:flex flex-row gap-6 justify-between">
                    <div className="flex flex-col justify-between gap-1 w-1/2">
                        <div className="flex justify-between items-center gap-3 pb-3">
                            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                                {resource.name}
                            </span>
                            <span className="text-sm md:text-base lg:text-lg text-secondary">
                                {resource.type}
                            </span>
                        </div>
                        <span className="grid grid-rows-1 grid-flow-col justify-start text-base md:text-lg lg:text-xl text-secondary">
                            <FaMapPin className="mr-2 pt-1 size-6" />
                            <span className="flex flex-wrap">
                                {resource.location}
                            </span>
                        </span>
                        <div className="flex justify-start items-center gap-3">
                            <span className="grid grid-rows-1 grid-flow-col justify-start text-sm md:text-base text-secondary">
                                <FaCalendarAlt className="mr-2 pt-1 size-6" />
                                <span className="flex flex-wrap">
                                    {resource.days.join(", ")}
                                </span>
                            </span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3">
                            <span className="grid grid-rows-1 grid-flow-col justify-start text-sm md:text-base text-secondary">
                                <FaRegClock className="mr-2 pt-1 size-6" />
                                <span className="flex flex-wrap">
                                    {stringToTime(resource.open)} - {stringToTime(resource.close)}
                                </span>
                            </span>
                            <span className="grid grid-rows-1 grid-flow-col justify-end lg:justify-center text-sm md:text-base text-secondary">
                                <LuTimer className="mr-2 pt-1 size-6" />
                                <span className="flex flex-wrap">
                                    {resource.maxResLen} mins Max
                                </span>
                            </span>
                            <span className="grid grid-rows-1 grid-flow-col justify-start lg:justify-end text-sm md:text-base text-secondary">
                                <FaUsers className="mr-2 pt-1 size-6" />
                                <span className="flex flex-wrap">
                                    {resource.maxResSize} person max
                                </span>
                            </span>
                        </div>
                        <span className="text-sm md:text-base text-secondary py-2">
                            {resource.description}
                        </span>
                        <span className="flex justify-between mt-2 ">
                            <BackButton />
                            <button>
                            </button>
                        </span>
                    </div>
                    <div className="relative container flex place-items-center w-1/2 md:h-80 lg:h-72">
                        {resource.imageUrls.length > 1 && (
                            <div className="h-full">
                                <button
                                    onClick={prevImage}
                                    className="absolute bg-white bg-opacity-10 h-full top-1/2 transform -translate-y-1/2 left-3 z-10"
                                >
                                    <FaArrowAltCircleLeft className="p-1 text-light_neutral size-10" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute bg-white bg-opacity-10 h-full top-1/2 transform -translate-y-1/2 right-3 z-10"
                                >
                                    <FaArrowAltCircleRight className="p-1 text-light_neutral size-10" />
                                </button>
                            </div>
                        )}
                        <img
                            key={resource.imageUrls[currentImageIndex]}
                            src={resource.imageUrls[currentImageIndex]}
                            alt="Resource"
                            className="w-full h-full object-cover object-center rounded-lg"
                        />
                    </div>
                </div>
                <div className="md:hidden ">
                    <div className="relative container flex place-items-center w-full h-36">
                        {resource.imageUrls.length > 1 && (
                            <div className="h-full">
                                <button
                                    onClick={prevImage}
                                    className="absolute bg-white bg-opacity-10 h-full top-1/2 transform -translate-y-1/2 left-3 z-10"
                                >
                                    <FaArrowAltCircleLeft className="p-1 text-light_neutral size-10" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute bg-white bg-opacity-10 h-full top-1/2 transform -translate-y-1/2 right-3 z-10"
                                >
                                    <FaArrowAltCircleRight className="p-1 text-light_neutral size-10" />
                                </button>
                            </div>
                        )}
                        <img
                            key={resource.imageUrls[currentImageIndex]}
                            src={resource.imageUrls[currentImageIndex]}
                            alt="Resource"
                            className="w-full h-full object-cover object-center rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between items-center gap-3 pt-4 pb-1">
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                            {resource.name}
                        </span>
                        <span className="text-sm md:text-base lg:text-lg text-secondary">
                            {resource.type}
                        </span>
                    </div>
                    <span className="grid grid-rows-1 grid-flow-col justify-start text-base md:text-lg lg:text-xl text-secondary">
                        <FaMapPin className="mr-2 pt-1 size-6" />
                        <span className="flex flex-wrap">
                            {resource.location}
                        </span>
                    </span>
                    <div className="flex justify-start items-center gap-3">
                        <span className="grid grid-rows-1 grid-flow-col justify-start text-sm md:text-base text-secondary">
                            <FaCalendarAlt className="mr-2 pt-1 size-6" />
                            <span className="flex flex-wrap">
                                {resource.days.join(", ")}
                            </span>
                        </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3">
                        <span className="grid grid-rows-1 grid-flow-col justify-start text-sm md:text-base text-secondary">
                            <FaRegClock className="mr-2 pt-1 size-6" />
                            <span className="flex flex-wrap">
                                {stringToTime(resource.open)} - {stringToTime(resource.close)}
                            </span>
                        </span>
                        <span className="grid grid-rows-1 grid-flow-col justify-end lg:justify-center text-sm md:text-base text-secondary">
                            <LuTimer className="mr-2 pt-1 size-6" />
                            <span className="flex flex-wrap">
                                {resource.maxResLen} mins Max
                            </span>
                        </span>
                        <span className="grid grid-rows-1 grid-flow-col justify-start lg:justify-end text-sm md:text-base text-secondary">
                            <FaUsers className="mr-2 pt-1 size-6" />
                            <span className="flex flex-wrap">
                                {resource.maxResSize} person max
                            </span>
                        </span>
                    </div>
                    <span className="text-sm md:text-base text-secondary py-2">
                        {resource.description}
                    </span>
                    <span className="flex justify-between pt-5">
                        <BackButton />
                        <button>
                        </button>
                    </span>
                </div>
                <ReserveCalendarView
                    openTime={resource.open}
                    closeTime={resource.close}
                    maxResSize={resource.maxResSize}
                    resourceId={resourceId}
                    openDays={resource.days}
                    maxDuration={resource.maxResLen}
                />
            </div>
        </div>
    );
};

export default Reserve;