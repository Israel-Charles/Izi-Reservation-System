import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";
import { BiSolidError, BiX } from "react-icons/bi";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<ResourceFormData>();

    const existingImages = watch("imageUrls");

    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        setValue(
            "imageUrls",
            existingImages.filter((url) => url !== imageUrl)
        );
    };

    return (
        <div className="flex flex-col gap-y-6">
            <h2 className="text-2xl text-primary font-bold">Images</h2>
            <div className="text-primary font-bold flex-1">
                Upload Images{" "}
                <span className="text-tertiary font-normal">
                    ( select 1 - 6, max 5MB each )
                </span>
                <div
                    className={`mt-2 relative rounded-lg border-2 border-dashed border-${
                        errors.imageFiles ? "error" : "primary"
                    }`}
                >
                    {existingImages && (
                        <div className="p-3 bg-background grid grid-cols-6 gap-4">
                            {existingImages.map((imageUrl) => (
                                <div key={imageUrl} className="relative group">
                                    <img
                                        src={imageUrl}
                                        alt="Resource"
                                        className="h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={(event) =>
                                            handleDelete(event, imageUrl)
                                        }
                                        className="absolute top-2 right-2 bg-background rounded-full p-1 group-hover:block hidden"
                                    >
                                        <BiX size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className={`w-full bg-background rounded-lg p-3 text-${
                            errors.imageFiles ? "error" : "primary"
                        } font-semibold`}
                        {...register("imageFiles", {
                            validate: (imageFiles) => {
                                const totalLength =
                                    imageFiles.length +
                                    (existingImages?.length || 0);
                                if (totalLength === 0) {
                                    return "Please upload at least one image";
                                }
                                if (totalLength > 6) {
                                    return "You can upload at most 6 images";
                                }
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
