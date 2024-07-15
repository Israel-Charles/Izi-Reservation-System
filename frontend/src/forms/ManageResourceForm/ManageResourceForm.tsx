import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import HoursSection from "./HoursSection";
import ImagesSection from "./ImagesSection";
import { ResourceType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export type ResourceFormData = {
	_id: string;
	userId: string;
	name: string;
	location: string;
	description: string;
	maxResLen: number;
	maxResSize: number;
	type: string;
	open: string;
	close: string;
	days: string[];
	imageFiles: FileList;
	imageUrls: string[];
};

type Props = {
	resource?: ResourceType;
	onSave: (resourceFormData: FormData) => void;
	isLoading: boolean;
};

const ManageResourceForm = ({ onSave, isLoading, resource }: Props) => {
	const formMethods = useForm<ResourceFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(resource);
	}, [resource, reset]);

	const onSubmit = handleSubmit((formDataJson: ResourceFormData) => {
		const formData = new FormData();
		if (resource) {
			formData.append("resourceId", resource._id);
		}
		formData.append("name", formDataJson.name);
		formData.append("location", formDataJson.location);
		formData.append("description", formDataJson.description);
		formData.append("maxResLen", formDataJson.maxResLen.toString());
		formData.append("maxResSize", formDataJson.maxResSize.toString());
		formData.append("type", formDataJson.type);
		formData.append("open", formDataJson.open);
		formData.append("close", formDataJson.close);
		formDataJson.days.forEach((day, index) => {
			formData.append(`days[${index}]`, day);
		});
		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}
		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});
		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-10" onSubmit={onSubmit}>
				<DetailsSection />
				<TypeSection />
				<HoursSection />
				<ImagesSection />
				<span className="flex justify-between">
					<Link
						to="/my-resources"
						className="flex bg-med_orange text-primary text-xl font-bold p-2 hover:bg-dark_orange">
						Back
					</Link>
					<button
						disabled={isLoading}
						type="submit"
						className="bg-med_orange text-primary p-2 font-bold hover:bg-dark_orange text-xl disabled:bg-tertiary disabled:text-secondary">
						{isLoading ? "Saving..." : "Save"}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageResourceForm;
