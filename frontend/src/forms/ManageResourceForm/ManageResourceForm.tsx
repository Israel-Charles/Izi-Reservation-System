import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import HoursSection from "./HoursSection";
import ImagesSection from "./ImagesSection";

export type ResourceFormData = {
	_id: string;
	userId: string;
	name: string;
	location: string;
	description: string;
	maxResLen: number;
	maxResSize: number;
	type: string;
	open: Date;
	close: Date;
	days: string[];
	imageFiles: string[];
	lastUpdated: Date;
};

type Props = {
	onSave: (resourceFormData: FormData) => void;
	isLoading: boolean;
};

const ManageResourceForm = ({ onSave, isLoading }: Props) => {
	const formMethods = useForm<ResourceFormData>();
	const { handleSubmit } = formMethods;

	const onSubmit = handleSubmit((formDataJson: ResourceFormData) => {
		const formData = new FormData();
		formData.append("name", formDataJson.name);
		formData.append("location", formDataJson.location);
		formData.append("description", formDataJson.description);
		formData.append("maxResLen", formDataJson.maxResLen.toString());
		formData.append("maxResSize", formDataJson.maxResSize.toString());
		formData.append("type", formDataJson.type);
		formData.append("open", formDataJson.open.toISOString());
		formData.append("close", formDataJson.close.toISOString());
		formData.append("days", JSON.stringify(formDataJson.days));
		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});
		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-10" onSubmit={onSubmit}>
				<h1 className="text-3xl text-primary font-bold mb-3">Add Resource</h1>
				<DetailsSection />
				<TypeSection />
				<HoursSection />
				<ImagesSection />
				<span className="flex justify-end">
					<button disabled={isLoading} type="submit" className="bg-med_orange text-primary p-2 font-bold hover:bg-dark_orange text-xl disabled:bg-tertiary disabled:text-secondary">
						{isLoading ? "Saving..." : "Save"}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageResourceForm;
