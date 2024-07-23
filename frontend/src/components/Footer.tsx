import { Link } from "react-router-dom";
import { LogoButton } from "./Buttons";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-background_alt p-6">
			<div className="flex flex-col text-primary">
				<div className="flex flex-row items-center justify-between">
					<a
						href="https://github.com/keatsane/big-project-4331"
						target="_blank"
						name="Github"
						rel="noopener noreferrer">
						<FaGithub
							size={30}
							className="text-primary hover:text-secondary transition-all"
						/>

					</a>
					<LogoButton />
				</div>
				<div className="border-t border-primary pt-8 mt-8 mb-4">
					<div className="flex flex-row items-center justify-between">
						<div className="flex flex-row items-center gap-4">
							<p className="text-sm leading-5">
								COP-4331 - Big Project - Team 2
							</p>
						</div>
						<Link to="/about" className="hover:underline">
							About
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
