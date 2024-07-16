import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { LogoButton, SignOutButton, ThemeButton } from "./Buttons";

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<header className="bg-background_alt flex justify-between items-center p-6">
			<LogoButton />
			<nav className="flex gap-x-2 md:gap-x-4 lg:gap-x-6">
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
			</nav>
		</header>
	);
};

export default Header;
