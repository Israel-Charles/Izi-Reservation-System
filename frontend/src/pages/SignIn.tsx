import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaEye, FaEyeSlash } from "react-icons/fa6";
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
		onSuccess: async () => {
			showToast({ message: "Sign in successful!", type: "SUCCESS" });
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
		<div className="flex justify-center">
			<div className="md:w-96 lg:w-128">
				<div className="p-6 flex flex-col">
					<form className="flex flex-col gap-y-8 mt-14" onSubmit={onSubmit}>
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
								<span className="absolute text-error text-sm">
									{errors.identifier.message}
								</span>
							)}
						</label>
						<label className="text-primary font-bold">
							Password
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
								<span className="absolute text-error text-sm">
									{errors.password.message}
								</span>
							)}
						</label>
						<button
							type="submit"
							className="mt-2 gap-x-2 flex w-full justify-center items-center rounded-md bg-med_orange px-3 py-2 font-bold text-primary text-xl transition-all duration-200 hover:gap-x-4 border-2 border-background hover:border-primary">
							Login
							<FaArrowRightLong className="text-primay" />
						</button>
					</form>
					{/* OAuth */}
				</div>
			</div>
			{/* <div className="relative hidden md:block">
				<img
					alt="login image"
					className="absolute inset-0 object-cover "
					src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
				/>
			</div> */}
		</div>
	);
};

export default SignIn;
