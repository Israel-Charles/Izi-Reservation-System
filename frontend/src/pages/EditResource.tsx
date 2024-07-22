import { zoomies } from "ldrs";
import { useContext, useEffect } from "react";
import * as apiClient from "../api-client";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { AppContext } from "../contexts/AppContext";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";

const EditResource = () => {
    const navigate = useNavigate();
    const { showToast } = useContext(AppContext);
    const { resourceId } = useParams();
    const { data: resource } = useQuery(
        "getMyResourceById",
        () => apiClient.getMyResourceById(resourceId || ""),
        {
            enabled: !!resourceId,
        }
    );

    useEffect(() => {
        zoomies.register();
    }, []);

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

    const { mutate: deleteResource, isLoading: isDeleting } = useMutation(
        () => apiClient.deleteResource(resourceId || ""),
        {
            onSuccess: (responseBody) => {
                showToast({
                    message: responseBody.message,
                    type: "SUCCESS",
                });
                navigate("/my-resources");
            },
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" });
            },
        }
    );

    const handleDelete = () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this resource? This action cannot be undone."
        );
        if (isConfirmed) {
            deleteResource();
        }
    };

    return (
        <div className="container mx-auto px-6 my-14">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl text-primary font-bold">
                    Edit Resource
                </h1>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded text-xl text-light_neutral bg-error font-bold px-3 py-2 hover:bg-background_alt hover:text-error hover:shadow-lg transition-all disabled:bg-background_alt disabled:pointer-events-none"
                >
                    {isDeleting ? (
                        <div className="py-1/2">
                            <l-zoomies
                                size="65"
                                stroke="10"
                                bg-opacity="0.1"
                                speed="1.4"
                                color="rgb(200, 0, 0)"
                            ></l-zoomies>
                        </div>
                    ) : (
                        "Delete"
                    )}
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
