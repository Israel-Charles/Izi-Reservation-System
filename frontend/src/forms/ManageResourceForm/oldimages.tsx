// import { useFormContext } from "react-hook-form";
// import { ResourceFormData } from "./ManageResourceForm";
// import { BiSolidError } from "react-icons/bi";
// import { IoMdPhotos } from "react-icons/io";

// const ImagesSection = () => {
// 	const {
// 		register,
// 		formState: { errors },
// 		watch,
// 		setValue,
// 	} = useFormContext<ResourceFormData>();

// 	const existingImageUrls = watch("imageUrls");

// 	const handleDelete = (
// 		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
// 		imageUrl: string
// 	) => {
// 		event.preventDefault();
// 		setValue(
// 			"imageUrls",
// 			existingImageUrls.filter((url) => url !== imageUrl)
// 		);
// 	};

// 	const onDragOver = (event) => {
// 		event.preventDefault();
// 	};

// 	const onDrop = (event) => {
// 		event.preventDefault();
// 		const files = Array.from(event.dataTransfer.files).filter((file) =>
// 			file.type.startsWith("image/")
// 		);
// 		const newImageUrls = files.map((file) => URL.createObjectURL(file));
// 		setValue("imageUrls", (existingImageUrls || []).concat(newImageUrls));
// 	};

// 	console.log(watch("imageFiles"));

// 	return (
// 		<div className="flex flex-col gap-y-6">
// 			<h2 className="text-2xl text-primary font-bold">Images</h2>
// 			{/* <div className="text-primary font-bold flex-1">
// 				Images{" "}
// 				<span className="text-tertiary font-normal">( select 1 - 6 )</span>
// 				<div
// 					className={`mt-2 relative rounded-lg border-2 border-${
// 						errors.imageFiles ? "error" : "primary"
// 					} p-3 grid grid-cols-4 gap-2`}>
// 					{existingImageUrls && (
// 						<div className="grid grid-cols-6 gap-4">
// 							{existingImageUrls.map((url) => (
// 								<div key={url} className="relative group">
// 									<img src={url} className="min-h-full object-cover" />
// 									<button
// 										onClick={(event) => handleDelete(event, url)}
// 										className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 text-light_neutral font-extrabold transition-all">
// 										DELETE
// 									</button>
// 								</div>
// 							))}
// 						</div>
// 					)}
// 					<input
// 						type="file"
// 						multiple
// 						accept="image/*"
// 						className="w-full text-primary font-normal"
// 						{...register("imageFiles", {
// 							validate: (imageFiles) => {
// 								const totalLength =
// 									imageFiles.length + (existingImageUrls?.length || 0);
// 								if (totalLength === 0)
// 									return "Please select at least one image";
// 								if (totalLength > 6)
// 									return "You can only upload a maximum of 6 images";
// 								return true;
// 							},
// 						})}
// 					/>
// 				</div>
// 				{errors.imageFiles && (
// 					<span className="flex items-center gap-x-1 absolute text-error mt-1">
// 						<BiSolidError size={16} />
// 						{errors.imageFiles.message}
// 					</span>
// 				)}
// 			</div> */}
// 			<div className="col-span-full">
// 				<div className="flex gap-1">
// 					<div className="text-primary font-bold">Upload Images</div>
// 					<span className="text-tertiary font-normal">( select 1 - 6 )</span>
// 				</div>
// 				<div
// 					className={`mt-2 flex justify-center rounded-lg border-2 border-dashed border-${
// 						!errors.imageFiles ? "primary" : "error"
// 					} px-6 py-10`}
// 					onDragOver={onDragOver}
// 					onDrop={onDrop}>
// 					<div className="text-center">
// 						<IoMdPhotos className="mx-auto h-12 w-12 text-tertiary" />
// 						<div className="mt-4 flex text-sm leading-6 text-secondary">
// 							<label className="relative cursor-pointer rounded-md font-semibold text-link hover:text-link_hover hover:underline">
// 								<span>Upload a file</span>
// 								{existingImageUrls && (
// 									<div className="grid grid-cols-6 gap-4">
// 										{existingImageUrls.map((url) => (
// 											<div key={url} className="relative group">
// 												<img src={url} className="min-h-full object-cover" />
// 												<button
// 													onClick={(event) => handleDelete(event, url)}
// 													className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 text-light_neutral font-extrabold transition-all">
// 													DELETE
// 												</button>
// 											</div>
// 										))}
// 									</div>
// 								)}
// 								<input
// 									type="file"
// 									multiple
// 									accept="image/*"
// 									className="sr-only"
// 									{...register("imageFiles", {
// 										validate: (imageFiles) => {
// 											const totalLength =
// 												imageFiles.length + (existingImageUrls?.length || 0);
// 											if (totalLength === 0)
// 												return "Please select at least one image";
// 											if (totalLength > 6)
// 												return "You can only upload a maximum of 6 images";
// 											return true;
// 										},
// 									})}
// 								/>
// 							</label>
// 							<p className="pl-1">or drag and drop</p>
// 						</div>
// 						<p className="text-xs leading-5 text-secondary">IMAGE up to 10MB</p>
// 					</div>
// 				</div>
//
// 			</div>
// 		</div>
// 	);
// };

// export default ImagesSection;
