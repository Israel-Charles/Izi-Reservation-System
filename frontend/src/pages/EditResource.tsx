import { useContext } from "react";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { AppContext } from "../contexts/AppContext";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";

const EditResource = () => {
    const { showToast } = useContext(AppContext);
    const { resourceId } = useParams();
    const { data: resource } = useQuery(
        "getMyResourceById",
        () => apiClient.getMyResourceById(resourceId || ""),
        {
            enabled: !!resourceId,
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateResource, {
        onSuccess: (responseBody) => {
            showToast({ message: responseBody.message, type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleSave = (resourceFormData: FormData) => {
        mutate(resourceFormData);
    };

    return (
        <div className="container mx-auto px-6 my-14">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl text-primary font-bold">
                    Edit Resource
                </h1>
                <button className="rounded text-xl text-light_neutral bg-error font-bold px-3 py-2 hover:bg-background_alt hover:text-error hover:shadow-lg transition-all">
                    Delete
                </button>
            </div>
            <ManageResourceForm
                resource={resource}
                onSave={handleSave}
                isLoading={isLoading}
            />
        </div>
    );
};

export default EditResource;
