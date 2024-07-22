import { zoomies } from "ldrs";
import { useEffect } from "react";
import TypeSection from "./TypeSection";
import HoursSection from "./HoursSection";
import ImagesSection from "./ImagesSection";
import DetailsSection from "./DetailsSection";
import { FormProvider, useForm } from "react-hook-form";
import { ResourceType } from "../../../../backend/src/types/resource";
import { BackButton } from "../../components/Buttons";

export type ResourceFormData = {
    _id?: string;
    name: string;
    location: string;
    description: string;
    maxResLen: number;
    maxResSize: number;
    type: string;
    open: string;
    close: string;
    days: string[];
    imageFiles: FileList;
    imageUrls: string[];
};

type Props = {
    resource?: ResourceType;
    onSave: (resourceFormData: FormData) => void;
    isLoading: boolean;
};

const ManageResourceForm = ({ onSave, isLoading, resource }: Props) => {
    const formMethods = useForm<ResourceFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        zoomies.register();
    }, []);

    useEffect(() => {
        reset(resource);
    }, [resource, reset]);

    const onSubmit = handleSubmit((formDataJson: ResourceFormData) => {
        const formData = new FormData();
        if (resource) {
            formData.append("resourceId", resource._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("location", formDataJson.location);
        formData.append("description", formDataJson.description);
        formData.append("maxResLen", formDataJson.maxResLen.toString());
        formData.append("maxResSize", formDataJson.maxResSize.toString());
        formData.append("type", formDataJson.type);
        formData.append("open", formDataJson.open);
        formData.append("close", formDataJson.close);
        formDataJson.days.forEach((day, index) => {
            formData.append(`days[${index}]`, day);
        });
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((imageUrl, index) => {
                formData.append(`imageUrls[${index}]`, imageUrl);
            });
        }
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });
        onSave(formData);
    });

    return (
        <div className="rounded-lg bg-background_alt p-6 shadow-lg">
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <DetailsSection isLoading={isLoading} />
                    <div className="border-b-2 border-background" />
                    <TypeSection isLoading={isLoading} />
                    <div className="border-b-2 border-background" />
                    <HoursSection isLoading={isLoading} />
                    <div className="border-b-2 border-background" />
                    <ImagesSection isLoading={isLoading} />
                    <span className="flex justify-between">
                        <BackButton />
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all"
                        >
                            {isLoading ? (
                                <div className="py-1/2">
                                    <l-zoomies
                                        size="50"
                                        stroke="15"
                                        bg-opacity="0.1"
                                        speed="1.4"
                                        color="rgb(255, 125, 40)"
                                    ></l-zoomies>
                                </div>
                            ) : (
                                <span>Save</span>
                            )}
                        </button>
                    </span>
                </form>
            </FormProvider>
        </div>
    );
};

export default ManageResourceForm;
