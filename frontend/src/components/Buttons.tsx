import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa6";
import { AppContext } from "../contexts/AppContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useMutation, useQueryClient } from "react-query";

export const LogoButton = () => {
    return (
        <Link
            to="/"
            className="flex flex-row items-center group font-semibold text-2xl text-primary"
        >
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
    const { showToast } = useContext(AppContext);

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async (responseBody) => {
            await queryClient.invalidateQueries("authenticate");
            showToast({ message: responseBody.message, type: "SUCCESS" });
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
            className="rounded text-primary font-bold px-3 py-2 hover:bg-med_orange hover:shadow-lg transition-all"
        >
            Sign Out
        </button>
    );
};

export const ThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className="rounded text-med_orange bg-background font-bold p-2.5 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all"
            onClick={toggleTheme}
        >
            {theme === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
    );
};

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Link
            onClick={() => navigate(-1)}
            className="hover:shadow-lg bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-med_orange transition-all flex items-center gap-2"
        >
            <FaArrowLeft /> Back
        </Link>
    );
};
