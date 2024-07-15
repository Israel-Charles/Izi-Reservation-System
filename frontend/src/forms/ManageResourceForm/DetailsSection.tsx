import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl text-primary font-bold">Details</h2>
			<label className="text-primary text-sm font-bold flex-1">
				Name <span className="text-error">*</span>
				<input
					type="text"
					autoComplete="off"
					className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
					{...register("name", { required: "Name is required" })}></input>
				{errors.name && (
					<span className="text-error">{errors.name.message}</span>
				)}
			</label>
			<label className="text-primary text-sm font-bold flex-1">
				Location <span className="text-error">*</span>
				<input
					type="text"
					className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
					{...register("location", {
						required: "Location is required",
					})}></input>
				{errors.location && (
					<span className="text-error">{errors.location.message}</span>
				)}
			</label>
			<label className="text-primary text-sm font-bold flex-1">
				Description <span className="text-error">*</span>
				<textarea
					rows={5}
					className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
					{...register("description", {
						required: "Description is required",
					})}></textarea>
				{errors.description && (
					<span className="text-error">{errors.description.message}</span>
				)}
			</label>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-primary text-sm font-bold flex-1">
					Maximum reservation length (minutes){" "}
					<span className="text-error">*</span>
					<input
						type="number"
						min={15}
						max={300}
						step={15}
						className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
						{...register("maxResLen", {
							required: "Maximum reservation length is required",
						})}></input>
					{errors.maxResLen && (
						<span className="text-error">{errors.maxResLen.message}</span>
					)}
				</label>
				<label className="text-primary text-sm font-bold flex-1">
					Maximum group size per reservation{" "}
					<span className="text-error">*</span>
					<input
						type="number"
						min={1}
						max={99}
						className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
						{...register("maxResSize", {
							required: "Maximum group size per reservation is required",
						})}></input>
					{errors.maxResSize && (
						<span className="text-error">{errors.maxResSize.message}</span>
					)}
				</label>
			</div>
		</div>
	);
};

export default DetailsSection;
