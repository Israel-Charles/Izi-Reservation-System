import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: "Registration Successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<div className="flex">
			<div className="p-6 flex-1 md:flex-none">
				<div className="flex flex-col mt-20">
					<h2 className="text-4xl font-extrabold leading-9 tracking-tight text-med_orange mb-1">
						Start Here.
					</h2>
					<span className="leading-6 text-primary font-bold">
						Already have an account?{" "}
						<Link
							to="/sign-in"
							className="text-link hover:text-link_hover hover:underline transition-all">
							Sign In
						</Link>
					</span>
					<form className="my-6 flex flex-col gap-y-4" onSubmit={onSubmit}>
						<div className="flex flex-col md:flex-row gap-5">
							<label className="text-primary font-bold">
								First name
								<input
									type="text"
									placeholder="first name"
									className={
										!errors.firstName
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("firstName", {
										required: "First name is required",
									})}
								/>
								{errors.firstName && (
									<span className="text-error text-sm">
										{errors.firstName.message}
									</span>
								)}
							</label>
							<label className="text-primary font-bold">
								Last name
								<input
									type="text"
									placeholder="last name"
									className={
										!errors.lastName
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("lastName", {
										required: "Last name is required",
									})}
								/>
								{errors.lastName && (
									<span className="text-error text-sm">
										{errors.lastName.message}
									</span>
								)}
							</label>
						</div>
						<label className="text-primary font-bold">
							User name
							<input
								type="text"
								placeholder="user name"
								className={
									!errors.userName
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
								}
								{...register("userName", {
									required: "User name is required",
								})}
							/>
							{errors.userName && (
								<span className="text-error text-sm">
									{errors.userName.message}
								</span>
							)}
						</label>
						<label className="text-primary font-bold">
							Email address
							<input
								type="email"
								placeholder="email address"
								className={
									!errors.email
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
								}
								{...register("email", {
									required: "Email address is required",
								})}
							/>
							{errors.email && (
								<span className="text-error text-sm">
									{errors.email.message}
								</span>
							)}
						</label>
						<label className="text-primary font-bold">
							Password
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="password"
									className={
										!errors.password
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
									}
									{...register("password", {
										required: "Password is required",
										validate: (value) => {
											if (value.length < 6)
												return "Password must be at least 6 characters";
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
								<span className="text-error text-sm">
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
									className={
										!errors.confirmPassword
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
									}
									{...register("confirmPassword", {
										validate: (value) => {
											if (!value) {
												return "Confirm password is required";
											} else if (watch("password") !== value) {
												return "Your passwords do not match";
											}
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
								<span className="text-error text-sm">
									{errors.confirmPassword.message}
								</span>
							)}
						</label>
						<button
							type="submit"
							className="mt-3 gap-x-2 flex w-full justify-center items-center rounded-md bg-med_orange px-3 py-1.5 font-bold text-primary shadow-sm transition-all duration-200 hover:gap-x-4 border-2 border-background hover:border-primary">
							Create Account
							<FaArrowRightLong className="text-primay" />
						</button>
					</form>
					{/* OAuth */}
				</div>
			</div>
		</div>
	);
};

export default Register;
