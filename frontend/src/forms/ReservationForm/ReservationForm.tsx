import { zoomies } from "ldrs";
import { useForm } from "react-hook-form";
import { BackButton } from "../../components/Buttons";
import { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";
import { convertTimeToMinutes } from "../../../../backend/src/middleware/time";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";

type Props = {
    resourceId: string;
};

type ReservationFormData = {
    comment: string;
    start: string;
    startMinutes: number;
    end: string;
    endMinutes: number;
    size: number;
};

const ReservationForm = ({ resourceId }: Props) => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReservationFormData>();

    useEffect(() => {
        zoomies.register();
    }, []);

    const startValue = watch("start");
    const endValue = watch("end");

    const startMinutes = startValue
        ? convertTimeToMinutes(startValue)
        : undefined;
    const endMinutes = endValue ? convertTimeToMinutes(endValue) : undefined;

    const mutation = useMutation(apiClient.makeReservation, {
        onSuccess: () => {},
        onError: (error: Error) => {
            showToast("error", error.message);
        },
    });

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex flex-col gap-4"
            >
                <span className="text-lg font-semibold">Reservation form</span>
                <label className="text-primary font-bold">
                    Comment
                    <div className="relative">
                        <textarea
                            rows={3}
                            placeholder="comment..."
                            autoComplete="off"
                            // disabled={isLoading}
                            className={
                                !errors.comment
                                    ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal mt-1"
                                    : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal mt-1"
                            }
                            {...register("comment", {
                                required: "Comment is required",
                                maxLength: {
                                    value: 2000,
                                    message: "Max 2000 characters",
                                },
                            })}
                        />
                    </div>
                    {errors.comment && (
                        <span className="flex items-center gap-x-1 absolute text-error -mb-2">
                            <BiSolidError size={16} />
                            {errors.comment.message}
                        </span>
                    )}
                </label>

                <div className="flex justify-start gap-x-2 items-center">
                    <label className="text-primary font-bold">
                        Start
                        <div className="relative">
                            <input
                                id="reservation-start"
                                type="time"
                                // disabled={isLoading}
                                className={
                                    !errors.start
                                        ? "bg-transparent border-2 border-primary placeholder-secondary text-primary rounded w-full py-2 px-3 font-normal my-1"
                                        : "bg-transparent border-2 border-error placeholder-error text-error rounded w-full py-2 px-3 font-normal my-1"
                                }
                                {...register("start", {
                                    required: "Start time is required",
                                    validate: (start) => {
                                        if (start && endMinutes)
                                            return (
                                                startMinutes < endMinutes ||
                                                "Start time must be before end time"
                                            );
                                    },
                                    validate: (start) => {
                                        if (start && resourceId.open)
                                            return (
                                                startMinutes >
                                                    resourceId.openMinutes ||
                                                "Start time must be after open time"
                                            );
                                    },
                                    validate: (start) => {
                                        if (start && resourceId.close)
                                            return (
                                                startMinutes <
                                                    resourceId.closeMinutes ||
                                                "Start time must be before close time"
                                            );
                                    },
                                })}
                            />
                        </div>
                        {errors.start && (
                            <span className="flex items-center gap-x-1 absolute text-error">
                                <BiSolidError size={16} />
                                {errors.start.message}
                            </span>
                        )}
                    </label>
                    <label className="text-primary font-bold">
                        End
                        <div className="relative">
                            <input
                                id="reservation-end"
                                type="time"
                                // disabled={isLoading}
                                className={
                                    !errors.end
                                        ? "bg-transparent border-2 border-primary placeholder-secondary text-primary rounded w-full py-2 px-3 font-normal my-1"
                                        : "bg-transparent border-2 border-error placeholder-error text-error rounded w-full py-2 px-3 font-normal my-1"
                                }
                                {...register("end", {
                                    required: "End time is required",
                                    validate: (end) => {
                                        if (end && startMinutes)
                                            return (
                                                endMinutes > startMinutes ||
                                                "End time must be after start time"
                                            );
                                    },
                                    validate: (end) => {
                                        if (end && resourceId.open)
                                            return (
                                                endMinutes >
                                                    resourceId.openMinutes ||
                                                "End time must be after open time"
                                            );
                                    },
                                    validate: (end) => {
                                        if (end && resourceId.close)
                                            return (
                                                endMinutes <
                                                    resourceId.closeMinutes ||
                                                "End time must be before close time"
                                            );
                                    },
                                })}
                            />
                        </div>
                        {errors.end && (
                            <span className="flex items-center gap-x-1 absolute text-error">
                                <BiSolidError size={16} />
                                {errors.end.message}
                            </span>
                        )}
                    </label>
                    <label className="text-primary font-bold">
                        Group Size:
                        <div className="relative">
                            <input
                                min={1}
                                max={50}
                                type="number"
                                placeholder="1-50"
                                // disabled={isLoading}
                                className={
                                    !errors.size
                                        ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
                                        : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
                                }
                                {...register("size", {
                                    required: "Group size is required",
                                    min: {
                                        value: 1,
                                        message: "Group size must be >= 1",
                                    },
                                    max: {
                                        value: resourceId.maxResSize,
                                        message:
                                            "Group size must be <= " +
                                            resourceId.maxResSize,
                                    },
                                })}
                            />
                        </div>
                        {errors.size && (
                            <span className="flex items-center gap-x-1 absolute text-error">
                                <BiSolidError size={16} />
                                {errors.size.message}
                            </span>
                        )}
                    </label>
                </div>
            </form>
            <span className="flex justify-between">
                <BackButton />
                <button
                    // disabled={isLoading}
                    type="submit"
                    className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all"
                >
                    {/* { ? ( */}
                    <div className="py-1/2">
                        <l-zoomies
                            size="50"
                            stroke="15"
                            bg-opacity="0.1"
                            speed="1.4"
                            color="rgb(255, 125, 40)"
                        ></l-zoomies>
                    </div>
                    {/* ) : (
                        <span>Save</span>
                    )} */}
                </button>
            </span>
        </div>
    );
};

export default ReservationForm;
