import { dayTypes } from "../../config/resource-options-config";
import { useFormContext } from "react-hook-form";
import { ResourceFormData } from "./ManageResourceForm";
import { BiSolidError } from "react-icons/bi";

const HoursSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<ResourceFormData>();

    const openWatch = watch("open");
    const daysWatch = watch("days");

    return (
        <div className="flex flex-col gap-y-6">
            <h2 className="text-2xl text-primary font-bold">Hours</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-primary font-bold flex-1">
                    Open
                    <div className="relative">
                        <input
                            type="time"
                            className={
                                !errors.open
                                    ? "bg-transparent border-2 border-primary placeholder-secondary text-primary rounded w-full py-2 px-3 font-normal my-1"
                                    : "bg-transparent border-2 border-error placeholder-error text-error rounded w-full py-2 px-3 font-normal my-1"
                            }
                            {...register("open", {
                                required: "Open time is required",
                            })}
                        />
                    </div>
                    {errors.open && (
                        <span className="flex items-center gap-x-1 absolute text-error">
                            <BiSolidError size={16} />
                            {errors.open.message}
                        </span>
                    )}
                </label>
                <label className="text-primary font-bold flex-1">
                    Close
                    <div className="relative">
                        <input
                            type="time"
                            className={
                                !errors.close
                                    ? "bg-transparent border-2 border-primary placeholder-secondary text-primary rounded w-full py-2 px-3 font-normal my-1"
                                    : "bg-transparent border-2 border-error placeholder-error text-error rounded w-full py-2 px-3 font-normal my-1"
                            }
                            {...register("close", {
                                required: "Close time is required",
                                validate: (close) => {
                                    if (close && openWatch)
                                        return (
                                            close > openWatch ||
                                            "Close time must be after open time"
                                        );
                                },
                            })}
                        />
                    </div>
                    {errors.close && (
                        <span className="flex items-center gap-x-1 absolute text-error">
                            <BiSolidError size={16} />
                            {errors.close.message}
                        </span>
                    )}
                </label>
            </div>
            <div className="text-primary font-bold flex-1 mt-4">
                Days{" "}
                <span className="text-tertiary font-normal">
                    ( select minimum one )
                </span>
                <div
                    className={`mt-2 relative rounded-lg border-2 border-${
                        errors.days ? "error" : "primary"
                    } p-3 grid grid-cols-4 gap-2`}
                >
                    {dayTypes.map((day) => (
                        <label
                            key={day}
                            className={`${
                                daysWatch && daysWatch.includes(day)
                                    ? "flex justify-center cursor-pointer rounded bg-med_orange text-sm px-4 py-2 font-semibold hover:bg-light_orange transition-all"
                                    : "flex justify-center cursor-pointer rounded bg-background text-sm px-4 py-2 font-semibold hover:bg-transparent transition-all"
                            } ${errors.days ? "text-error" : ""}`}
                        >
                            <input
                                type="checkbox"
                                value={day}
                                className="hidden"
                                {...register("days", {
                                    validate: (days) => {
                                        return (
                                            (days && days.length > 0) ||
                                            "Must be open atleast one day"
                                        );
                                    },
                                })}
                            />
                            {day}
                        </label>
                    ))}
                </div>
                {errors.days && (
                    <span className="flex items-center gap-x-1 absolute text-error mt-1">
                        <BiSolidError size={16} />
                        {errors.days.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default HoursSection;
