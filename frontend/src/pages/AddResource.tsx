import { useContext } from "react";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { AppContext } from "../contexts/AppContext";
import ManageResourceForm from "../forms/ManageResourceForm/ManageResourceForm";

const AddResource = () => {
	const { showToast } = useContext(AppContext);

	const { mutate, isLoading } = useMutation(apiClient.addResource, {
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
