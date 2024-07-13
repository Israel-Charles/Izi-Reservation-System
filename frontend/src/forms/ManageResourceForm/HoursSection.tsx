import { days } from "../../config/resource-options-config";
import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";

const HoursSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	const openWatch = watch("open");

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl text-primary font-bold">Hours</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-primary text-sm font-bold flex-1">
					Open <span className="text-error">*</span>
					<input type="time" className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("open", { required: "Open time is required" })}></input>
					{errors.open && <span className="text-error">{errors.open.message}</span>}
				</label>
				<label className="text-primary text-sm font-bold flex-1">
					Close <span className="text-error">*</span>
					<input
						type="time"
						className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
						{...register("close", {
							required: "Close time is required",
							validate: (value) => {
								if (value && openWatch) return value > openWatch || "Close time must be after open time";
							},
						})}
					/>
					{errors.close && <span className="text-error">{errors.close.message}</span>}
				</label>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{days.map((day) => (
					<label key={day} className="text-sm text-primary flex gap-1">
						<input
							type="checkbox"
							value={day}
							{...register("days", {
								validate: (days) => {
									return (days && days.length > 0) || "Must be open atleast one day";
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
