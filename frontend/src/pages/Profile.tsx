import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";

export type ProfileFormData = {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
};

const Profile = () => {
	const { showToast } = useAppContext();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ProfileFormData>();

	const { isLoading, data } = useQuery("profile", apiClient.getProfile, {
		onSuccess: (userData) => {
			setValue("firstName", userData.firstName);
			setValue("lastName", userData.lastName);
			setValue("userName", userData.userName);
			setValue("email", userData.email);
		},
	});

	const mutation = useMutation(apiClient.updateProfile, {
		onSuccess: async (responseBody) => {
			showToast({ message: responseBody.message, type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	useEffect(() => {
		if (!isLoading && data) {
			setValue("firstName", data.firstName);
			setValue("lastName", data.lastName);
			setValue("userName", data.userName);
		}
	}, [isLoading, data, setValue]);

	const onSubmit = handleSubmit((formData) => {
		mutation.mutate(formData);
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
								Update your profile
							</h2>
						</div>
						<div className="flex flex-row gap-x-4">
							<label className="text-primary font-bold flex-1">
								First name
								<div className="relative">
									<input
										type="text"
										placeholder="first name"
										autoComplete="off"
										className={
											!errors.firstName
												? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
												: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
										}
										{...register("firstName", {
											required: "First name is required",
											maxLength: { value: 50, message: "Max 50 characters" },
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
										autoComplete="off"
										className={
											!errors.lastName
												? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
												: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
										}
										{...register("lastName", {
											required: "Last name is required",
											maxLength: { value: 50, message: "Max 50 characters" },
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
									autoComplete="off"
									className={
										!errors.userName
											? "bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1"
											: "bg-transparent border-2 border-error placeholder-error rounded w-full py-2 px-3 font-normal my-1"
									}
									{...register("userName", {
										required: "User name is required",
										minLength: { value: 5, message: "Min 5 characters" },
										maxLength: { value: 50, message: "Max 50 characters" },
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
							Email address{" "}
							<span className="text-secondary text-sm font-normal">
								( cannot edit )
							</span>
							<div className="relative">
								<input
									type="email"
									placeholder="email address"
									autoComplete="email"
									disabled
									className="bg-transparent border-2 border-primary placeholder-secondary rounded w-full py-2 px-3 font-normal my-1 disabled:bg-tertiary text-secondary"
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
							{/* {errors.email && (
								<span className="flex items-center gap-x-1 absolute text-error">
									<BiSolidError size={16} />
									{errors.email.message}
								</span>
							)} */}
						</label>
						<div className="flex justify-between items-center">
							<Link
								to="/"
								className="mt-4 bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-med_orange transition-all flex items-center gap-2">
								<FaArrowLeft /> Home
							</Link>
							<button
								type="submit"
								className="mt-4 bg-med_orange text-primary font-semibold px-4 py-2 rounded hover:bg-background transition-all">
								Update Profile
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
