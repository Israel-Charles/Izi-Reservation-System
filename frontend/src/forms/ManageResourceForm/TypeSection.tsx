import { useFormContext } from "react-hook-form";
import { resourceTypes } from "../../config/resource-options-config";
import { ResourceFormData } from "./ManageResourceForm";
import { BiSolidError } from "react-icons/bi";

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	const typeWatch = watch("type");

	return (
		<div className="flex flex-col gap-y-6">
			<h2 className="text-2xl text-primary font-bold">Type</h2>
			<div className="text-primary font-bold flex-1">
				Type <span className="text-tertiary font-normal">( select one )</span>
				<div
					className={`mt-2 relative rounded-lg border-2 border-${
						errors.type ? "error" : "primary"
					} p-3 grid grid-cols-4 gap-2`}>
					{resourceTypes.map((type) => (
						<label
							key={type}
							className={`${
								typeWatch === type
									? "flex justify-center cursor-pointer rounded bg-med_orange text-sm px-4 py-2 font-semibold hover:bg-light_orange transition-all"
									: "flex justify-center cursor-pointer rounded bg-background text-sm px-4 py-2 font-semibold hover:bg-transparent transition-all"
							} ${errors.type ? "text-error" : ""}`}>
							<input
								type="radio"
								value={type}
								className="hidden"
								{...register("type", { required: "Type is required" })}
							/>
							<span>{type}</span>
						</label>
					))}
				</div>
				{errors.type && (
					<span className="flex items-center gap-x-1 absolute text-error mt-1">
						<BiSolidError size={16} />
						{errors.type.message}
					</span>
				)}
			</div>
		</div>
	);
};

export default TypeSection;
