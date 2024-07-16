import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";
import { BiSolidError } from "react-icons/bi";

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext<ResourceFormData>();

	const existingImageUrls = watch("imageUrls");

	const handleDelete = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		imageUrl: string
	) => {
		event.preventDefault();
		setValue(
			"imageUrls",
			existingImageUrls.filter((url) => url !== imageUrl)
		);
	};

	return (
		<div className="flex flex-col gap-y-6">
			<h2 className="text-2xl text-primary font-bold">Images</h2>
			<div className="text-primary font-bold flex-1">
				Images{" "}
				<span className="text-tertiary font-normal">( select 1 - 6 )</span>
				<div
					className={`mt-2 relative rounded-lg border-2 border-${
						errors.imageFiles ? "error" : "primary"
					} p-3 grid grid-cols-4 gap-2`}>
					{existingImageUrls && (
						<div className="grid grid-cols-6 gap-4">
							{existingImageUrls.map((url) => (
								<div key={url} className="relative group">
									<img src={url} className="min-h-full object-cover" />
									<button
										onClick={(event) => handleDelete(event, url)}
										className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 text-light_neutral font-extrabold transition-all">
										DELETE
									</button>
								</div>
							))}
						</div>
					)}
					<input
						type="file"
						multiple
						accept="image/*"
						className="w-full text-primary font-normal"
						{...register("imageFiles", {
							validate: (imageFiles) => {
								const totalLength =
									imageFiles.length + (existingImageUrls?.length || 0);
								if (totalLength === 0)
									return "Please select at least one image";
								if (totalLength > 6)
									return "You can only upload a maximum of 6 images";
								return true;
							},
						})}
					/>
				</div>
				{errors.imageFiles && (
					<span className="flex items-center gap-x-1 absolute text-error mt-1">
						<BiSolidError size={16} />
						{errors.imageFiles.message}
					</span>
				)}
			</div>
		</div>
	);
};

export default ImagesSection;
