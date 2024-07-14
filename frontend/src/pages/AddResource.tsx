import { useMutation } from "react-query";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddResource = () => {
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(apiClient.addMyResource, {
		onSuccess: () => {
			showToast({ message: "Resource added successfully!", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleSave = (resourceFormData: FormData) => {
		mutate(resourceFormData);
	};
	return <ManageResourceForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddResource;
