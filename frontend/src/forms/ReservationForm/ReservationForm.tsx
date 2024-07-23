import { zoomies } from "ldrs";
import { useForm } from "react-hook-form";
import { BackButton } from "../../components/Buttons";
import { useContext, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { convertTimeToMinutes } from "../../../../backend/src/middleware/time";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { AppContext } from "../../contexts/AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    open: string;
    close: string;
    maxResSize: number;
    resourceId: string;
};

type ReservationFormData = {
    comment: string;
    start: string;
    end: string;
    size: number;
};

const ReservationForm = ({ open, close, maxResSize, resourceId }: Props) => {
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { showToast } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ReservationFormData>();

    const convertTimeToDate = (timeString: string) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        const time = new Date();
        time.setHours(hours, minutes, 0);
        return time;
    };

    useEffect(() => {
        register("startDate");
        register("endDate");
    }, [register]);

    const openTime = convertTimeToDate(open);
    const closeTime = convertTimeToDate(close);

    useEffect(() => {
        zoomies.register();
    }, []);

    const mutation = useMutation({
        mutationFn: (formData: ReservationFormData) =>
            apiClient.makeReservation(formData, resourceId),
        onSuccess: (responseBody) => {
            showToast({ message: responseBody.message, type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <span className="text-lg font-semibold">Reserve your spot</span>
                <label className="text-primary font-bold">
                    Comment
                    <div className="relative">
                        <textarea
                            rows={3}
                            placeholder="comment..."
                            autoComplete="off"
                            disabled={mutation.isLoading}
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

                <div className="flex flex-col md:flex-row justify-start gap-6 items-center">
                    <label className="text-primary font-bold">
                        Day:
                        <div className="relative">
                            <select
                                value={dayOfWeek}
                                onChange={(e) => setDayOfWeek(e.target.value)}
                                disabled={mutation.isLoading}
                                className={
                                    !errors.dayOfWeek
                                        ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal mt-1"
                                        : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal mt-1"
                                }
                                {...register("dayOfWeek", {
                                    required: "Day is required",
                                })}
                            >
                                <option
                                    className="bg-background text-primary"
                                    value=""
                                >
                                    Select a Day
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Monday"
                                >
                                    Monday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Tuesday"
                                >
                                    Tuesday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Wednesday"
                                >
                                    Wednesday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Thursday"
                                >
                                    Thursday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Friday"
                                >
                                    Friday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Saturday"
                                >
                                    Saturday
                                </option>
                                <option
                                    className="bg-background text-primary"
                                    value="Sunday"
                                >
                                    Sunday
                                </option>
                            </select>
                        </div>
                        {errors.dayOfWeek && (
                            <span className="flex items-center gap-x-1 absolute text-error">
                                <BiSolidError size={16} />
                                {errors.dayOfWeek.message}
                            </span>
                        )}
                    </label>
                    <label className="text-primary font-bold">
                        Start Time:
                        <div className="relative">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setValue("startDate", date);
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                disabled={mutation.isLoading}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                minTime={openTime}
                                maxTime={closeTime}
                                className={
                                    !errors.start
                                        ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal mt-1"
                                        : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal mt-1"
                                }
                                {...register("start", {
                                    required: "Start is required",
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
                        End Time:
                        <div className="relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date);
                                    setValue("endDate", date); // Manually update the value using setValue
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                disabled={mutation.isLoading}
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                minTime={openTime}
                                maxTime={closeTime}
                                className={
                                    !errors.end
                                        ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal mt-1"
                                        : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal mt-1"
                                }
                                {...register("end", {
                                    required: "End is required",
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
                        Group:
                        <div className="relative">
                            <input
                                min={1}
                                max={maxResSize}
                                type="number"
                                disabled={mutation.isLoading}
                                className={
                                    !errors.size
                                        ? "bg-transparent border-2 border-primary placeholder-tertiary rounded w-full py-2 px-3 font-normal my-1"
                                        : "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
                                }
                                {...register("size", {
                                    required: "Required",
                                    min: {
                                        value: 1,
                                        message: "Must be >= 1",
                                    },
                                    max: {
                                        value: resourceId.maxResSize,
                                        message:
                                            "Must be <= " +
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
                <span className="flex justify-between mt-2">
                    <BackButton />
                    <button
                        disabled={mutation.isLoading}
                        type="submit"
                        className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg disabled:bg-tertiary disabled:text-secondary transition-all"
                    >
                        {mutation.isLoading ? (
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
                            "Reserve"
                        )}
                    </button>
                </span>
            </form>
        </div>
    );
};

export default ReservationForm;
