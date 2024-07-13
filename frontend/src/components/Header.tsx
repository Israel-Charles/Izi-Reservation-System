import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { LogoButton, SignUpButton, SignInButton, SignOutButton, ThemeButton } from "./Buttons";

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<header className="flex justify-between items-center bg-background_alt p-6">
			<LogoButton />
			<div className="flex flex-row items-center gap-6">
				{isLoggedIn ? (
					<>
						<ThemeButton />
						<Link to="/my-reservations" className="text-tertiary px-3 py-2 font-bold bg-primary hover:bg-secondary">
							My Reservations
						</Link>
						<Link to="/my-resources" className="text-tertiary px-3 py-2 font-bold bg-primary hover:bg-secondary">
							My Resources
						</Link>
						<SignOutButton />
					</>
				) : (
					<nav>
						<div className="hidden md:flex gap-x-6 ">
							<ThemeButton />
							<Link to="/about" className="flex items-center text-primary font-bold px-3 py-2 hover:border-b-2 border-primary">
								About
							</Link>
							<SignInButton />
							<SignUpButton />
						</div>
						<div className="flex md:hidden">
							<button type="button" className="-m-2.5 hover:bg-tertiary rounded-md p-1 transition-all">
								<span className="sr-only">Open main menu</span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-primary">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
								</svg>
							</button>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
