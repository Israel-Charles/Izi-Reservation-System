import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

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
            <span className="flex">{resource.name}</span>
        </div>
    );
};

export default Reserve;
