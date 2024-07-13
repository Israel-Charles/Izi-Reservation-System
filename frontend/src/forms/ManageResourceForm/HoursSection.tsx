import { days } from "../../config/resource-options-config";
import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";

const HoursSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl text-primary font-bold">Hours</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-primary text-sm font-bold flex-1">
					Opening time <span className="text-error">*</span>
					<input type="Date" className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("open", { required: "Opening time required" })}></input>
					{errors.open && <span className="text-error">{errors.open.message}</span>}
				</label>
				<label className="text-primary text-sm font-bold flex-1">
					Closing time <span className="text-error">*</span>
					<input type="Date" className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("close", { required: "Closing time is required" })}></input>
					{errors.close && <span className="text-error">{errors.close.message}</span>}
				</label>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{days.map((day) => (
					<label className="text-sm text-primary flex gap-1">
						<input
							type="checkbox"
							value={day}
							{...register("days", {
								validate: (days) => {
									if (days && days.length > 0) {
										return true;
									}
									return "Must be open atleast one day";
								},
							})}
						/>
						{day}
					</label>
				))}
			</div>
			{errors.days && <span className="text-sm text-error font-bold">{errors.days.message}</span>}
		</div>
	);
};

export default HoursSection;
