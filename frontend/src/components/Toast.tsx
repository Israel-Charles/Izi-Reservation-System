import { useEffect } from "react";

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
		type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-success_background text-success max-w-md" : "fixed top-4 right-4 z-50 p-4 rounded-md bg-error_background text-error max-w-md";

	return (
		<div className={styles}>
			<div className="flex justify-center items-center">
				<span className="text-lg font-semibold">{message}</span>
			</div>
		</div>
	);
};

export default Toast;
