import { useFormContext } from "react-hook-form";
import { resourceTypes } from "../../config/resource-options-config";
import { ResourceFormData } from "./ManageResourceForm";

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<ResourceFormData>();
	const typeWatch = watch("type");

	return (
		<div>
			<h2 className="text-2xl text-primary font-bold mb-3">Type</h2>
			<div className="grid grid-cols-4 gap-2">
				{resourceTypes.map((type) => (
					<label
						key={type}
						className={
							typeWatch === type
								? "cursor-pointer rounded-lg bg-med_orange text-sm text-primary px-4 py-2 font-semibold"
								: "cursor-pointer rounded-lg bg-primary text-sm px-4 py-2 font-semibold"
						}>
						<input
							type="radio"
							value={type}
							{...register("type", { required: "Type is required" })}
							className="hidden"
						/>
						<span>{type}</span>
					</label>
				))}
			</div>
			{errors.type && (
				<span className="text-sm text-error font-bold">
					{errors.type.message}
				</span>
			)}
		</div>
	);
};

export default TypeSection;
