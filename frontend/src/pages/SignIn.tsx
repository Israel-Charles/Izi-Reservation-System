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
		<div className="flex">
			<div className="p-6 flex-1 md:flex-none">
				<div className="flex flex-col mt-20">
					<h2 className="text-4xl font-extrabold leading-9 tracking-tight text-med_orange mb-1">
						Welcome Back.
					</h2>
					<span className="leading-6 text-primary font-bold">
						Don&apos;t have an account?{" "}
						<Link
							to="/register"
							className="text-link hover:text-link_hover hover:underline transition-all">
							Register
						</Link>
					</span>
					<form className="my-6 flex flex-col gap-y-4" onSubmit={onSubmit}>
						<label className="text-primary font-bold">
							Login
							<input
								type="text"
								placeholder="user name / email address"
								className={
									!errors.identifier
										? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
										: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
								}
								{...register("identifier", {
									required: "Login is required",
								})}></input>
							{errors.identifier && (
								<span className="text-error text-sm">
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
								<span className="text-error text-sm">
									{errors.password.message}
								</span>
							)}
						</label>
						<button
							type="submit"
							className="mt-3 gap-x-2 flex w-full justify-center items-center rounded-md bg-med_orange px-3 py-1.5 font-bold text-primary shadow-sm transition-all duration-200 hover:gap-x-4 border-2 border-background hover:border-primary">
							Login
							<FaArrowRightLong className="text-primay" />
						</button>
					</form>
					{/* OAuth */}
				</div>
			</div>
			{/* <div className="hidden relative md:flex flex-1">
				<img
					alt="login image"
					className="w-full object-cover overflow-hidden"
					src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
				/>
			</div> */}
		</div>
	);
};

export default SignIn;
