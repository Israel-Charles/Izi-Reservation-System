import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className="p-6">
			<div className="flex justify-center">
				<Link to="/register" className="group font-semibold text-2xl text-primary">
					<button className="relative inline-flex items-center justify-center px-2 py-1 overflow-hidden rounded-lg shadow-2xl">
						<span className="absolute w-80 h-80 -mt-10 -ml-3 transition-all duration-700 bg-light_orange rounded-full blur-md ease"></span>
						<span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
							<span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-dark_orange rounded-full blur-md"></span>
							<span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-med_orange rounded-full blur-md"></span>
						</span>
						<span className="relative text-light_neutral px-4 py-2">Start Now</span>
					</button>
				</Link>
				{/* <div className="relative w-full max-h-full border-t-2 border-med_orange overflow-hidden">
						<img alt="home image" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" />
					</div> */}
			</div>
		</div>
	);
};

export default Landing;
