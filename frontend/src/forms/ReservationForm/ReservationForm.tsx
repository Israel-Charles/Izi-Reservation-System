import { zoomies } from "ldrs";
import { useForm } from "react-hook-form";
import { BackButton } from "../../components/Buttons";
import { useEffect } from "react";

type Props = {
    resourceId: string;
};

type ReservationFormData = {
    comment: string;
    start: string;
    end: string;
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

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
                className="flex flex-col gap-4"
            >
                <span className="text-lg font-semibold">Reservation form</span>
                <textarea
                    placeholder="Comment"
                    className="rounded bg-background p-2"
                    {...register("comment")}
                />
                <input
                    type="time"
                    placeholder="Start"
                    className="rounded bg-background p-2"
                    {...register("start")}
                />
                <input
                    type="time"
                    placeholder="End"
                    className="rounded bg-background p-2"
                    {...register("end")}
                />
                <input
                    type="number"
                    placeholder="Size"
                    className="rounded bg-background p-2"
                    {...register("size")}
                />
            </form>
            <span className="flex justify-between">
                <BackButton />
                <button
                    disabled
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
