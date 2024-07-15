import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";
import { useAppContext } from "../contexts/AppContext";

const EditResource = () => {
	const { showToast } = useAppContext();
	const { resourceId } = useParams();
	const { data: resource } = useQuery(
		"getMyResourceById",
		() => apiClient.getMyResourceById(resourceId || ""),
		{
			enabled: !!resourceId,
		}
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyResourceById, {
		onSuccess: () => {
			showToast({ message: "Resource updated successfully!", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleSave = (resourceFormData: FormData) => {
		mutate(resourceFormData);
	};

	return (
		<div>
			<h1 className="text-3xl text-primary font-bold mb-3">Edit Resource</h1>
			<ManageResourceForm
				resource={resource}
				onSave={handleSave}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default EditResource;
