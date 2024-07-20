import { useEffect } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";

type ToastProps = {
	message: string;
	type: "SUCCESS" | "ERROR";
	onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => clearTimeout(timer);
	}, [onClose]);

	const styles =
		type === "SUCCESS"
			? "fixed top-4 right-4 z-50 p-4 rounded-md bg-success text-light_neutral max-w-md shadow-lg"
			: "fixed top-4 right-4 z-50 p-4 rounded-md bg-error text-light_neutral max-w-md shadow-lg";

	return (
		<div className={styles} onClick={onClose}>
			<div className="flex justify-center items-center gap-x-2">
				<span className="text-light_neutral">
					{type === "SUCCESS" ? (
						<MdCheckCircle className="h-8 w-8" />
					) : (
						<MdError className="h-8 w-8" />
					)}
				</span>
				<span className="text-lg font-semibold">{message}</span>
			</div>
		</div>
	);
};

export default Toast;
