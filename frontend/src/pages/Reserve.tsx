import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { BackButton } from "../components/Buttons";

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
            <div className="bg-background_alt rounded-lg shadow-lg p-6 text-primary">
                <div className="flex justify-start items-center gap-3">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {resource.name}
                    </span>
                    <span className="text-sm md:text-base lg:text-lg text-secondary">
                        {resource.type}
                    </span>
                </div>
                <span className="text-base md:text-lg lg:text-xl text-secondary">
                    {resource.location}
                </span>
                <span className="flex justify-between">
                    <BackButton />
                    <button
                        disabled
                        type="submit"
                        className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all"
                    >
                        {/* { ? ( */}
                        <div className="py-1/2">
                            <l-zoomies
                                size="50"
                                stroke="15"
                                bg-opacity="0.1"
                                speed="1.4"
                                color="rgb(255, 125, 40)"
                            ></l-zoomies>
                        </div>
                        {/* ) : (
                        <span>Save</span>
                    )} */}
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Reserve;
