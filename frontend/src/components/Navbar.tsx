import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { LogoButton, SignOutButton, ThemeButton } from "./Buttons";

const Navbar = () => {
    const menuRef = useRef(null);
    const location = useLocation();
    const { isLoggedIn } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-20 bg-background_alt flex justify-between items-center shadow-xl p-6">
            <LogoButton />
            <div className="hidden md:flex items-center gap-x-4">
                {isLoggedIn ? (
                    <>
                        <ThemeButton />
                        <Link
                            to="/my-reservations"
                            className={`rounded font-bold px-3 py-2 hover:shadow-lg ${
                                location.pathname === "/my-reservations"
                                    ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                    : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                            } transition-all`}
                        >
                            My Reservations
                        </Link>
                        <Link
                            to="/my-resources"
                            className={`rounded font-bold px-3 py-2 hover:shadow-lg ${
                                location.pathname === "/my-resources"
                                    ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                    : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                            } transition-all`}
                        >
                            My Resources
                        </Link>
                        <Link
                            to="/profile"
                            className={`rounded font-bold px-3 py-2 hover:shadow-lg ${
                                location.pathname === "/profile"
                                    ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                    : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                            } transition-all`}
                        >
                            Profile
                        </Link>
                        <SignOutButton />
                    </>
                ) : (
                    <>
                        <ThemeButton />
                        <Link
                            to="/sign-in"
                            className={`rounded font-bold px-3 py-2 hover:shadow-lg ${
                                location.pathname === "/sign-in"
                                    ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                    : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                            } transition-all`}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className={`rounded font-bold px-3 py-2 hover:shadow-lg ${
                                location.pathname === "/register"
                                    ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                    : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                            } transition-all`}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
            <div ref={menuRef} className="md:hidden">
                <button
                    className="rounded-lg p-2 text-primary hover:bg-background transition"
                    onClick={toggleMenu}
                >
                    <AiOutlineMenu size={30} />
                </button>
                {isMenuOpen && (
                    <div className="absolute z-20 top-20 right-0 rounded-lg bg-background_alt shadow-xl p-4 flex flex-col items-start md:hidden gap-y-2">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/my-reservations"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/my-reservations"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    My Reservations
                                </Link>
                                <Link
                                    to="/my-resources"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/my-resources"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    My Resources
                                </Link>
                                <Link
                                    to="/profile"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/profile"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/about"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/about"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    About
                                </Link>
                                <div className="flex justify-between w-full gap-4">
                                    <ThemeButton />
                                    <SignOutButton onClick={toggleMenu} />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/sign-in"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/sign-in"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={toggleMenu}
                                    className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                        location.pathname === "/register"
                                            ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                            : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                    } transition-all`}
                                >
                                    Register
                                </Link>

                                <div className="flex justify-between w-full gap-4">
                                    <ThemeButton />
                                    <Link
                                        to="/about"
                                        onClick={toggleMenu}
                                        className={`rounded w-full font-semibold px-4 py-2 hover:shadow-lg ${
                                            location.pathname === "/about"
                                                ? "bg-med_orange text-light_neutral hover:bg-light_orange"
                                                : "bg-background text-med_orange hover:bg-med_orange hover:text-light_neutral"
                                        } transition-all`}
                                    >
                                        About
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
