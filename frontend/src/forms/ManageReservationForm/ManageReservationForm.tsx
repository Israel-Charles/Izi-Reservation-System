import { zoomies } from "ldrs";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { ReservationType } from "../../types/ReservationType";
// import ImagesSection from "./ImagesSection";

export type ReservationFormData = {
	_id: string;
	userId: string;
	resourceId: string;
	comment: string;
	start: string;
	end: string;
	size: number;
};

type Props = {
	reservation?: ReservationType;
	onSave: (reservationFormData: FormData) => void;
	isLoading: boolean;
};

const ManageReservationForm = ({ onSave, isLoading, reservation }: Props) => {
	const formMethods = useForm<ReservationFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		zoomies.register();
	}, []);

	useEffect(() => {
		reset(reservation);
	}, [reservation, reset]);

	const onSubmit = handleSubmit((formDataJson: ReservationFormData) => {
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
		// if (formDataJson.imageUrls) {
		// 	formDataJson.imageUrls.forEach((url, index) => {
		// 		formData.append(`imageUrls[${index}]`, url);
		// 	});
		// }
		// Array.from(formDataJson.imageFiles).forEach((imageFile) => {
		// 	formData.append(`imageFiles`, imageFile);
		// });
		onSave(formData);
	});

	return (
		<div className="rounded-lg bg-background_alt p-6">
			<FormProvider {...formMethods}>
				<form className="flex flex-col gap-10" onSubmit={onSubmit}>
					<DetailsSection isLoading={isLoading} />
					<div className="border-b-2 border-background" />
					<TypeSection isLoading={isLoading} />
					<div className="border-b-2 border-background" />
					<HoursSection isLoading={isLoading} />
					{/* <div className="border-b-2 border-background" /> */}
					{/* <ImagesSection isLoading={isLoading} /> */}
					<span className="flex justify-between">
						<Link
							to="/my-resources"
							className="rounded text-xl text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							Back
						</Link>
						<button
							disabled={isLoading}
							type="submit"
							className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all">
							{isLoading ? (
								<div className="py-1/2">
									<l-zoomies
										size="70"
										stroke="15"
										bg-opacity="0.1"
										speed="1.4"
										color="rgb(255, 125, 40)"></l-zoomies>
								</div>
							) : (
								<span>Create</span>
							)}
						</button>
					</span>
				</form>
			</FormProvider>
		</div>
	);
};

export default ManageReservationForm;
