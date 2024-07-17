import { useMutation } from "react-query";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddResource = () => {
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(apiClient.addMyResource, {
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
			<h1 className="text-3xl text-primary font-bold mb-3">Add Resource</h1>
			<ManageResourceForm onSave={handleSave} isLoading={isLoading} />
		</div>
	);
};

export default AddResource;
