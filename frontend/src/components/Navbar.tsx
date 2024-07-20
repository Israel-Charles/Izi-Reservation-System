import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useRef, useState } from "react";
import { LogoButton, SignOutButton, ThemeButton } from "./Buttons";

const Navbar = () => {
	const menuRef = useRef(null);
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
		<div className="sticky top-0 z-10 bg-background_alt flex justify-between items-center shadow-xl p-6">
			<LogoButton />
			<div className="hidden md:flex items-center gap-x-4">
				{isLoggedIn ? (
					<>
						<ThemeButton />
						<Link
							to="/my-reservations"
							className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							My Reservations
						</Link>
						<Link
							to="/my-resources"
							className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							My Resources
						</Link>
						<Link
							to="/profile"
							className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							Profile
						</Link>
						<SignOutButton />
					</>
				) : (
					<>
						<ThemeButton />
						<Link
							to="/sign-in"
							className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							Sign In
						</Link>
						<Link
							to="/register"
							className="rounded text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
							Register
						</Link>
					</>
				)}
			</div>
			<div ref={menuRef} className="md:hidden">
				<button
					className="rounded-lg p-2 text-primary hover:bg-background transition"
					onClick={toggleMenu}>
					<AiOutlineMenu size={30} />
				</button>
				{isMenuOpen && (
					<div className="absolute z-20 top-20 right-0 rounded-lg bg-background_alt shadow-xl p-4 flex flex-col items-start md:hidden gap-y-2">
						{isLoggedIn ? (
							<>
								<Link
									to="/my-reservations"
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
									My Reservations
								</Link>
								<Link
									to="/my-resources"
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
									My Resources
								</Link>
								<Link
									to="/profile"
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
									Profile
								</Link>
								<Link
									to="/about"
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
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
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
									Sign In
								</Link>
								<Link
									to="/register"
									className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
									onClick={toggleMenu}>
									Register
								</Link>

								<div className="flex justify-between w-full gap-4">
									<ThemeButton />
									<Link
										to="/about"
										className="rounded bg-background w-full text-primary font-semibold px-4 py-2 hover:bg-med_orange hover:text-light_neutral transition-all"
										onClick={toggleMenu}>
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
