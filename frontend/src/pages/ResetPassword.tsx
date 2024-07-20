import { zoomies } from "ldrs";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { BiSolidError } from "react-icons/bi";
import { resetPassword } from "../api-client";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";

export type ResetFormData = {
	password: string;
	confirmPassword: string;
};

const ResetPassword = () => {
	const { showToast } = useContext(AppContext);
	const { resetToken } = useParams<{ resetToken: string }>();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		zoomies.register();
	}, []);

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetFormData>();

	const mutation = useMutation(
		(formData: ResetFormData) => resetPassword(resetToken as string, formData),
		{
			onSuccess: async (responseBody) => {
				showToast({ message: responseBody.message, type: "SUCCESS" });
			},
			onError: (error: Error) => {
				showToast({ message: error.message, type: "ERROR" });
			},
		}
	);

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<div className="container mx-auto max-w-xl px-6">
			<div className="flex flex-col bg-background_alt my-14 rounded-lg">
				<form className="p-6 flex flex-col gap-y-6" onSubmit={onSubmit}>
					<div>
						<h2 className="text-4xl font-extrabold tracking-tight text-med_orange mb-1">
							Update your password
						</h2>
						<span className="text-primary font-bold">
							Enter a new password and confirm it to reset.
						</span>
					</div>
					<label className="text-primary font-bold">
						Password
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="password"
								autoComplete="off"
								disabled={mutation.isLoading || mutation.isSuccess}
								className={
									!errors.password
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
								}
								{...register("password", {
									required: "Password is required",
									minLength: { value: 8, message: "Min 8 characters" },
									maxLength: { value: 50, message: "Max 50 characters" },
									validate: (value) => {
										return (
											/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}/.test(value) ||
											"Must contain at least one letter and one number"
										);
									},
								})}
							/>
							<button
								type="button"
								className={
									!errors.password
										? "absolute top-2 right-2 p-1.5 text-primary hover:bg-tertiary rounded-full transition-all"
										: "absolute top-2 right-2 p-1.5 text-error hover:bg-error_background rounded-full transition-all"
								}
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<FaEyeSlash className="size-6" />
								) : (
									<FaEye className="size-6" />
								)}
							</button>
						</div>
						{errors.password && (
							<span className="flex items-center gap-x-1 absolute text-error">
								<BiSolidError size={16} />
								{errors.password.message}
							</span>
						)}
					</label>
					<label className="text-primary font-bold">
						Confirm password
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="confirm password"
								autoComplete="off"
								disabled={mutation.isLoading || mutation.isSuccess}
								className={
									!errors.confirmPassword
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
								}
								{...register("confirmPassword", {
									required: "Confirm password is required",
									validate: (value) => {
										return (
											value === watch("password") || "Passwords do not match"
										);
									},
								})}
							/>
							<button
								type="button"
								className={
									!errors.confirmPassword
										? "absolute top-2 right-2 p-1.5 text-primary hover:bg-tertiary rounded-full transition-all"
										: "absolute top-2 right-2 p-1.5 text-error hover:bg-error_background rounded-full transition-all"
								}
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
								{showConfirmPassword ? (
									<FaEyeSlash className="size-6" />
								) : (
									<FaEye className="size-6" />
								)}
							</button>
						</div>
						{errors.confirmPassword && (
							<span className="flex items-center gap-x-1 absolute text-error">
								<BiSolidError size={16} />
								{errors.confirmPassword.message}
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
										size="125"
										stroke="15"
										bg-opacity="0.1"
										speed="1.4"
										color="rgb(255, 125, 40)"></l-zoomies>
								</div>
							) : mutation.isSuccess ? (
								<span>Password Changed</span>
							) : (
								<span>Change Password</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
