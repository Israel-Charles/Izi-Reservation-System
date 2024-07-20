import { useEffect, useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";
import { IoMdPhotos, IoMdCloseCircleOutline } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";

const ImagesSection = () => {
	const { setValue } = useFormContext<ResourceFormData>();
	const { errors } = useFormState({ name: "imageUrls" });
	const [images, setImages] = useState<string[]>([]);

	const handleFiles = (files: FileList) => {
		const filteredFiles = Array.from(files).filter((file) =>
			file.type.startsWith("image/")
		);
		const newImageUrls = filteredFiles
			.slice(0, 6 - images.length)
			.map((file) => URL.createObjectURL(file));
		const updatedImages = [...images, ...newImageUrls];
		setImages(updatedImages);
		setValue("imageUrls", updatedImages);
	};

	const handleDelete = (imageUrl: string) => {
		event.stopPropagation();
		const updatedImages = images.filter((url) => url !== imageUrl);
		setImages(updatedImages);
		setValue("imageUrls", updatedImages);
	};

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		handleFiles(event.dataTransfer.files);
	};

	useEffect(() => {
		console.log(images);
	}, [images]);

	console.log(images);

	return (
		<div className="flex flex-col gap-y-6">
			<h2 className="text-2xl text-primary font-bold">Images</h2>
			<div>
				<div className="flex gap-1 items-center">
					<label className="text-lg font-semibold text-primary">
						Upload Images
					</label>
					<span className="text-tertiary">( select 1 to 6 )</span>
				</div>
				<div
					className="relative mt-1 rounded-lg border-2 border-dashed border-primary p-6 flex flex-wrap gap-2 justify-center items-center"
					onDragOver={(e) => e.preventDefault()}
					onDrop={onDrop}>
					<div className="flex flex-col items-center gap-y-2">
						<div className="flex gap-3">
							{images.map((imageUrl, index) => (
								<div key={index} className="relative group">
									<img
										src={imageUrl}
										alt={`Uploaded ${index + 1}`}
										className="rounded-lg w-24 h-24 object-cover"
									/>
									<IoMdCloseCircleOutline
										className="absolute top-0 right-0 text-error cursor-pointer opacity-0 group-hover:opacity-100"
										size={24}
										onClick={() => handleDelete(imageUrl)}
									/>
								</div>
							))}
						</div>
						{images && <IoMdPhotos className="text-secondary" size={50} />}
						<div className="flex gap-1 items-center">
							<span className="text-link font-semibold hover:text-link_hover hover:underline">
								Upload files
							</span>
							<p className="text-secondary">or drag and drop</p>
						</div>
						<p className="text-sm text-secondary">Image up to ??? MB</p>
					</div>
				</div>
				{errors.imageUrls && (
					<span className="flex items-center gap-x-1 absolute text-error font-semibold mt-1">
						<BiSolidError size={16} />
						{errors.imageUrls.message}
					</span>
				)}
			</div>
		</div>
	);
};

export default ImagesSection;
