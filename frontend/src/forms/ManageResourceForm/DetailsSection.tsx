import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";
import { BiSolidError } from "react-icons/bi";

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	return (
		<div className="flex flex-col gap-y-6">
			<h2 className="text-2xl text-primary font-bold">Details</h2>
			<label className="text-primary font-bold flex-1">
				Name
				<div className="relative">
					<input
						type="text"
						placeholder="name"
						autoComplete="off"
						className={
							!errors.name
								? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
								: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
						}
						{...register("name", {
							required: "Name is required",
						})}
					/>
				</div>
				{errors.name && (
					<span className="flex items-center gap-x-1 absolute text-error">
						<BiSolidError size={16} />
						{errors.name.message}
					</span>
				)}
			</label>
			<label className="text-primary font-bold flex-1">
				Location
				<div className="relative">
					<input
						type="text"
						placeholder="location"
						autoComplete="off"
						className={
							!errors.location
								? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
								: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
						}
						{...register("location", {
							required: "Location is required",
						})}
					/>
				</div>
				{errors.location && (
					<span className="flex items-center gap-x-1 absolute text-error">
						<BiSolidError size={16} />
						{errors.location.message}
					</span>
				)}
			</label>
			<label className="text-primary font-bold flex-1">
				Description
				<div className="relative">
					<textarea
						rows={3}
						type="text"
						placeholder="description..."
						autoComplete="off"
						className={
							!errors.description
								? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
								: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
						}
						{...register("description", {
							required: "Description is required",
						})}
					/>
				</div>
				{errors.description && (
					<span className="flex items-center gap-x-1 absolute text-error -mt-2">
						<BiSolidError size={16} />
						{errors.description.message}
					</span>
				)}
			</label>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-primary font-bold flex-1">
					Maximum reservation time{" "}
					<span className="text-tertiary font-normal">( 15 - 300 )</span>
					<div className="relative">
						<input
							min={15}
							max={300}
							step={15}
							type="number"
							placeholder="maximum length"
							className={
								!errors.maxResLen
									? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
									: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
							}
							{...register("maxResLen", {
								required: "Maximum reservation length is required",
							})}
						/>
					</div>
					{errors.maxResLen && (
						<span className="flex items-center gap-x-1 absolute text-error">
							<BiSolidError size={16} />
							{errors.maxResLen.message}
						</span>
					)}
				</label>
				<label className="text-primary font-bold flex-1">
					Maximum reservation group size{" "}
					<span className="text-tertiary font-normal">( 1 - 50 )</span>
					<div className="relative">
						<input
							min={1}
							max={50}
							type="number"
							placeholder="maximum size"
							className={
								!errors.maxResSize
									? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
									: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
							}
							{...register("maxResSize", {
								required: "Maximum reservation group size is required",
							})}
						/>
					</div>
					{errors.maxResSize && (
						<span className="flex items-center gap-x-1 absolute text-error">
							<BiSolidError size={16} />
							{errors.maxResSize.message}
						</span>
					)}
				</label>
			</div>
		</div>
	);
};

export default DetailsSection;
