import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import { useState } from "react";

export type SignInFormData = {
	identifier: string;
	password: string;
};

const SignIn = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async (responseBody) => {
			await queryClient.invalidateQueries("authenticate");
			showToast({ message: responseBody.message, type: "SUCCESS" });
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
		<div className="container mx-auto max-w-xl">
			<div className="">
				<div className="px-6 flex flex-col">
					<form
						className="flex flex-col gap-y-8 my-14 bg-background_alt p-6 rounded-lg"
						onSubmit={onSubmit}>
						<div>
							<h2 className="text-4xl font-extrabold tracking-tight text-med_orange">
								Welcome Back.
							</h2>
							<span className="text-primary font-bold">
								Don&apos;t have an account?{" "}
								<Link
									to="/register"
									className="text-link hover:text-link_hover hover:underline transition-all">
									Register
								</Link>
							</span>
						</div>
						<label className="text-primary font-bold">
							Login
							<div className="relative">
								<input
									type="text"
									placeholder="user name / email address"
									autoComplete="username"
									className={
										!errors.identifier
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("identifier", {
										required: "Login is required",
									})}
								/>
							</div>
							{errors.identifier && (
								<span className="flex items-center gap-x-1 absolute text-error">
									<BiSolidError size={16} />
									{errors.identifier.message}
								</span>
							)}
						</label>
						<label className="text-primary font-bold">
							<div className="flex justify-between">
								Password
								<Link
									to="/password/forgot"
									className="text-link hover:text-link_hover hover:underline transition-all">
									Forgot password?
								</Link>
							</div>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="password"
									autoComplete="current-password"
									className={
										!errors.password
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 pr-12"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1 pr-12"
									}
									{...register("password", {
										required: "Password is required",
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
						<button
							type="submit"
							className="mt-2 gap-x-2 flex w-full justify-center items-center rounded-md bg-med_orange px-3 py-2 font-bold text-primary text-xl transition-all duration-200 hover:gap-x-4 border-2 border-background_alt hover:border-primary">
							Login
							<FaArrowRightLong className="text-primay" />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
