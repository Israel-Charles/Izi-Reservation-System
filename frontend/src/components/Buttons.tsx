import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export const LogoButton = () => {
	return (
		<Link to="/" className="group font-semibold text-2xl text-primary">
			<button className="relative inline-flex items-center justify-center px-2 py-1 overflow-hidden rounded-lg">
				<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-light_orange rounded-full blur-md ease"></span>
				<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
					<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-dark_orange rounded-full blur-md"></span>
					<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-med_orange rounded-full blur-md"></span>
				</span>
				<span className="relative text-light_neutral italic">4331</span>
			</button>
			<span className="pl-1">Booking</span>
		</Link>
	);
};

export const SignInButton = () => {
	return (
		<Link
			to="/sign-in"
			className="border border-med_orange font-bold relative overflow-hidden px-3 py-2 text-med_orange transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-med_orange before:transition-all before:duration-500 hover:text-primary hover:before:left-0 hover:before:w-full">
			<span className="relative z-10">Sign In</span>
		</Link>
	);
};

export const SignUpButton = () => {
	return (
		<Link
			to="/register"
			className="border border-primary font-bold relative overflow-hidden px-3 py-2 text-primary transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary before:transition-all before:duration-500 hover:text-med_orange hover:before:left-0 hover:before:w-full">
			<span className="relative z-10">Register</span>
		</Link>
	);
};

export const SignOutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("validateToken");
			showToast({ message: "Sign out successful!", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button onClick={handleClick} className="text-primary px-3 py-2 font-bold bg-med_orange hover:bg-dark_orange">
			Sign Out
		</button>
	);
};

export const ThemeButton = () => {
	return (
		<button className={`p-2 text-primary hover:bg-primary hover:text-med_orange rounded-lg transition-all`}>
			{/* {theme === "light" ? ( */}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
				<path
					fillRule="evenodd"
					d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
					clipRule="evenodd"
				/>
			</svg>
			{/* // ) : (
			// 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
			// 		<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
			// 	</svg>
			// )} */}
		</button>
	);
};
