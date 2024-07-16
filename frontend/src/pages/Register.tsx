import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { BiSolidError } from "react-icons/bi";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
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
		onSuccess: async (responseBody) => {
			showToast({ message: responseBody.message, type: "SUCCESS" });
			navigate("/sign-in");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<div className="container mx-auto max-w-3xl">
			<div className="">
				<div className="px-6 flex flex-col">
					<form
						className="flex flex-col gap-y-8 my-14 bg-background_alt p-6 rounded-lg"
						onSubmit={onSubmit}>
						<div>
							<h2 className="text-4xl font-extrabold tracking-tight text-med_orange">
								Start Here.
							</h2>
							<span className="text-primary font-bold">
								Already a member?{" "}
								<Link
									to="/sign-in"
									className="text-link hover:text-link_hover hover:underline transition-all">
									Sign In
								</Link>
							</span>
						</div>
						<div className="flex flex-row gap-x-4">
							<label className="text-primary font-bold flex-1">
								First name
								<div className="relative">
									<input
										type="text"
										placeholder="first name"
										autoComplete="given-name"
										className={
											!errors.firstName
												? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
												: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
										}
										{...register("firstName", {
											required: "First name is required",
										})}
									/>
								</div>
								{errors.firstName && (
									<span className="flex items-center gap-x-1 absolute text-error">
										<BiSolidError size={16} />
										{errors.firstName.message}
									</span>
								)}
							</label>
							<label className="text-primary font-bold flex-1">
								Last name
								<div className="relative">
									<input
										type="text"
										placeholder="last name"
										autoComplete="family-name"
										className={
											!errors.lastName
												? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
												: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
										}
										{...register("lastName", {
											required: "Last name is required",
										})}
									/>
								</div>
								{errors.lastName && (
									<span className="flex items-center gap-x-1 absolute text-error">
										<BiSolidError size={16} />
										{errors.lastName.message}
									</span>
								)}
							</label>
						</div>
						<label className="text-primary font-bold">
							User name
							<div className="relative">
								<input
									type="text"
									placeholder="user name"
									autoComplete="username"
									className={
										!errors.userName
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("userName", {
										required: "User name is required",
									})}
								/>
							</div>
							{errors.userName && (
								<span className="flex items-center gap-x-1 absolute text-error">
									<BiSolidError size={16} />
									{errors.userName.message}
								</span>
							)}
						</label>
						<label className="text-primary font-bold">
							Email address
							<div className="relative">
								<input
									type="email"
									placeholder="email address"
									autoComplete="email"
									className={
										!errors.email
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("email", {
										required: "Email address is required",
										validate: (value) => {
											return (
												/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
													value
												) || "Invalid email address"
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
						<label className="text-primary font-bold">
							Password
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="password"
									autoComplete="off"
									className={
										!errors.password
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
									}
									{...register("password", {
										required: "Password is required",
										validate: (value) => {
											return (
												value.length >= 6 ||
												"Password must be at least 6 characters long"
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
						<button
							type="submit"
							className="mt-2 gap-x-2 flex w-full justify-center items-center rounded-md bg-med_orange px-3 py-2 font-bold text-primary text-xl transition-all duration-200 hover:gap-x-4 border-2 border-background_alt hover:border-primary">
							Create Account
							<FaArrowRightLong className="text-primay" />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
