import { useForm } from "react-hook-form";

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
};

export default ReservationForm;
