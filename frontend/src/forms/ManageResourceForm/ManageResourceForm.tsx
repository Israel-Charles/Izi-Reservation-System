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
		<div className="rounded-lg bg-background_alt p-6">
			<FormProvider {...formMethods}>
				<form className="flex flex-col gap-10" onSubmit={onSubmit}>
					<DetailsSection />
					<div className="border-b-2 border-background" />
					<TypeSection />
					<div className="border-b-2 border-background" />
					<HoursSection />
					<div className="border-b-2 border-background" />
					<ImagesSection />
					<span className="flex justify-between">
						<Link
							to="/my-resources"
							className="rounded text-xl text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							Back
						</Link>
						<button
							disabled={isLoading}
							type="submit"
							className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all">
							{isLoading ? "Saving..." : "Save"}
						</button>
					</span>
				</form>
			</FormProvider>
		</div>
	);
};

export default ManageResourceForm;
