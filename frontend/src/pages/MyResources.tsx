import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import {
    FaMapPin,
    FaBuilding,
    FaUsers,
    FaRegClock,
    FaCalendarAlt,
} from "react-icons/fa";
import { LuTimer } from "react-icons/lu";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const MyResources = () => {
    const { showToast } = useContext(AppContext);

    const { data: resourceData } = useQuery(
        "getMyResources",
        apiClient.getMyResources,
        {
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" });
            },
        }
    );

    if (!resourceData) {
        return <></>;
    }

    return (
        <div className="container mx-auto p-6 my-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl text-primary font-bold">
                    My Resources
                </h1>
                <Link
                    to="/my-resources/add"
                    className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background_alt hover:text-med_orange hover:shadow-lg transition-all"
                >
                    Add Resource
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
                {resourceData.map((resource) => (
                    <div
                        key={resource._id}
                        className="flex flex-col bg-background_alt text-primary justify-between rounded-lg p-6 gap-6 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold">{resource.name}</h2>
                        <div className="whitespace-pre-line">
                            {resource.description}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <FaMapPin className="mr-2" />
                                {resource.location}
                            </div>
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <FaBuilding className="mr-2" />
                                {resource.type}
                            </div>
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <LuTimer className="mr-2" />
                                {resource.maxResLen} minutes max
                            </div>
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <FaUsers className="mr-2" />
                                {resource.maxResSize} person(s) max
                            </div>
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <FaRegClock className="mr-2" />
                                {resource.open} - {resource.close}
                            </div>
                            <div className="bg-background rounded p-3 flex items-center justify-center">
                                <FaCalendarAlt className="mr-2" />
                                {resource.days.join(", ")}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyResources;
