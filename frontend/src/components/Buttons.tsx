import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export const LogoButton = () => {
	return (
		<Link to="/" className="group font-semibold text-2xl text-primary">
			<span className="relative inline-flex items-center justify-center px-2 py-1 overflow-hidden rounded-lg">
				<span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-light_orange rounded-full blur-md ease"></span>
				<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
					<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-dark_orange rounded-full blur-md"></span>
					<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-med_orange rounded-full blur-md"></span>
				</span>
				<span className="relative text-light_neutral italic">4331</span>
			</span>
			<span className="pl-1">Booking</span>
		</Link>
	);
};

export const SignOutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			await queryClient.invalidateQueries("validateToken");
			showToast({ message: "Signed out", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleClick}
			className="rounded text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-background hover:text-med_orange hover:shadow-lg transition-all">
			Sign Out
		</button>
	);
};

export const ThemeButton = () => {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme : "light";
	});

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove(theme === "light" ? "dark" : "light");
		root.classList.add(theme);
	}, [theme]);

	return (
		<button
			className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all"
			onClick={toggleTheme}>
			{theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
		</button>
	);
};
