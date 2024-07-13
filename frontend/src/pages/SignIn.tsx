import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
	identifier: string;
	password: string;
};

const SignIn = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { showToast } = useAppContext();

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
		<div className="">
			<h2 className="text-4xl font-extrabold leading-9 tracking-tight text-med_orange mb-2">Welcome Back.</h2>
			<span className="leading-6 text-primary font-bold">
				Don&apos;t have an account?{" "}
				<Link to="/register" className="text-link hover:text-link_hover hover:underline transition-all">
					Register
				</Link>
			</span>
			<form className="flex flex-col gap-5 mt-8" onSubmit={onSubmit}>
				<label className="text-primary text-sm font-bold flex-1">
					Username / Email <span className="text-error">*</span>
					<input className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("identifier", { required: "Username / Email is required" })}></input>
					{errors.identifier && <span className="text-error">{errors.identifier.message}</span>}
				</label>
				<label className="text-primary text-sm font-bold flex-1">
					Password <span className="text-error">*</span>
					<input
						type="password"
						className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
						{...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}></input>
					{errors.password && <span className="text-error">{errors.password.message}</span>}
				</label>
				<span className="flex items-center justify-between">
					<span>
						<button type="submit" className="bg-med_orange text-primary p-2 font-bold hover:bg-dark_orange text-xl">
							Login
						</button>
					</span>
				</span>
				{/* OAuth */}
			</form>
			<div className="hidden relative w-full h-full md:block flex-col">
				<img
					alt="login image"
					className="absolute inset-0 w-full h-full object-cover"
					src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
				/>
			</div>
		</div>
	);
};

export default SignIn;
