import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

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
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl text-primary font-bold">Create an account</h2>
			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-primary text-sm font-bold flex-1">
					First Name <span className="text-error">*</span>
					<input className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("firstName", { required: "First name is required" })}></input>
					{errors.firstName && <span className="text-error">{errors.firstName.message}</span>}
				</label>
				<label className="text-primary text-sm font-bold flex-1">
					Last Name <span className="text-error">*</span>
					<input className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("lastName", { required: "Last name is required" })}></input>
					{errors.lastName && <span className="text-error">{errors.lastName.message}</span>}
				</label>
			</div>
			<label className="text-primary text-sm font-bold flex-1">
				Username <span className="text-error">*</span>
				<input className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("userName", { required: "Username is required" })}></input>
				{errors.userName && <span className="text-error">{errors.userName.message}</span>}
			</label>
			<label className="text-primary text-sm font-bold flex-1">
				Email <span className="text-error">*</span>
				<input type="email" className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1" {...register("email", { required: "Email is required" })}></input>
				{errors.email && <span className="text-error">{errors.email.message}</span>}
			</label>
			<label className="text-primary text-sm font-bold flex-1">
				Password <span className="text-error">*</span>
				<input
					type="password"
					className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
					{...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}></input>
				{errors.password && <span className="text-error">{errors.password.message}</span>}
			</label>
			<label className="text-primary text-sm font-bold flex-1">
				Confirm Password <span className="text-error">*</span>
				<input
					type="password"
					className="bg-transparent border rounded w-full py-1 px-2 font-normal mb-1"
					{...register("confirmPassword", {
						validate: (value) => {
							if (!value) {
								return "Confirm Password is required";
							} else if (watch("password") !== value) {
								return "Your passwords do not match";
							}
						},
					})}></input>
				{errors.confirmPassword && <span className="text-error">{errors.confirmPassword.message}</span>}
			</label>
			<span className="flex items-center justify-between">
				<span className="text-sm text-secondary">
					Already have an account?{" "}
					<Link to="/sign-in" className="font-semibold text-link hover:text-link_hover hover:underline transition-all">
						Sign In
					</Link>
				</span>
				<span>
					<button type="submit" className="bg-med_orange text-primary p-2 font-bold hover:bg-dark_orange text-xl">
						Create Account
					</button>
				</span>
			</span>
		</form>
	);
};

export default Register;
