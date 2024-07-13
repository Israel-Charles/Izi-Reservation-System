import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<ResourceFormData>();

	return (
		<div>
			<h2 className="text-2xl text-primary font-bold mb-3">Images</h2>
			<div className="border rounded p-4 flex flex-col gap-4">
				<input
					type="file"
					multiple
					accept="image/*"
					className="w-full text-seconday font-normal"
					{...register("imageFiles", {
						validate: (imageFiles) => {
							const totalLength = imageFiles.length;
							if (totalLength === 0) return "Please select at least one image";
							if (totalLength > 6) return "You can only upload a maximum of 6 images";
							return true;
						},
					})}
				/>
			</div>
			{errors.imageFiles && <span className="text-sm text-error font-bold">{errors.imageFiles.message}</span>}
		</div>
	);
};

export default ImagesSection;
