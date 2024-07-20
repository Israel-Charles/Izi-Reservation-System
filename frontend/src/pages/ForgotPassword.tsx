import { zoomies } from "ldrs";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { BiSolidError } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

export type ForgotFormData = {
	email: string;
};

const ForgotPassword = () => {
	const { showToast } = useContext(AppContext);

	useEffect(() => {
		zoomies.register();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotFormData>();

	const mutation = useMutation(apiClient.forgotPassword, {
		onSuccess: async (responseBody) => {
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
		<div className="container mx-auto max-w-xl px-6">
			<div className="flex flex-col bg-background_alt my-14 rounded-lg">
				<form className="p-6 flex flex-col gap-y-6" onSubmit={onSubmit}>
					<div>
						<h2 className="text-4xl font-extrabold tracking-tight text-med_orange mb-1">
							Forgot your password?
						</h2>
						<span className="text-primary font-bold">
							Enter an email address to receive a password reset link.
						</span>
					</div>
					<label className="text-primary font-bold">
						Email address
						<div className="relative">
							<input
								type="email"
								placeholder="email address"
								autoComplete="email"
								disabled={mutation.isLoading || mutation.isSuccess}
								className={
									!errors.email
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
								}
								{...register("email", {
									required: "Email address is required",
									validate: (value) => {
										return (
											/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
											"Invalid email address"
										);
									},
								})}
							/>
						</div>
						{errors.email && (
							<span className="flex items-center gap-x-1 absolute text-error">
								<BiSolidError size={16} />
								{errors.email.message}
							</span>
						)}
					</label>
					<div className="flex justify-between items-center">
						<Link
							to="/sign-in"
							className="mt-4 bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-med_orange transition-all flex items-center gap-2">
							<FaArrowLeft /> Sign In
						</Link>
						<button
							type="submit"
							disabled={mutation.isLoading || mutation.isSuccess}
							className="mt-4 bg-med_orange text-primary font-semibold px-4 py-2 rounded hover:bg-background disabled:bg-background disabled:pointer-events-none transition-all">
							{mutation.isLoading ? (
								<div className="py-1/2">
									<l-zoomies
										size="80"
										stroke="15"
										bg-opacity="0.1"
										speed="1.4"
										color="rgb(255, 125, 40)"></l-zoomies>
								</div>
							) : mutation.isSuccess ? (
								<span>Email Sent</span>
							) : (
								<span>Send Email</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
