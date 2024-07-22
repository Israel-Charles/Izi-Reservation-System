import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ReservationForm from "../forms/ReservationForm/ReservationForm";

const Reserve = () => {
    const { resourceId } = useParams();
    const { data: resource } = useQuery(
        "getResourceById",
        () => apiClient.getResourceById(resourceId as string),
        { enabled: !!resourceId }
    );
    if (!resource) {
        return <></>;
    }

    return (
        <div className="container mx-auto p-6 my-14">
            <div className="flex flex-col gap-y-6 bg-background_alt rounded-lg shadow-lg p-6 text-primary">
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
                <span className="font-extrabold text-blue-500">
                    calendar views will go here
                </span>
                <ReservationForm resourceId={resourceId} />
            </div>
        </div>
    );
};

export default Reserve;
