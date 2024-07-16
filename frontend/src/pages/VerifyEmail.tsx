import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const token = new
	// })
	return (
		<div className="container mx-auto max-w-xl">
			<div className="">
				<div className="px-6 flex flex-col">
					<form className="flex flex-col gap-y-8 my-14 bg-background_alt p-6 rounded-lg">
						<div>
							<h2 className="text-4xl font-extrabold tracking-tight text-med_orange">
								Verify Your Email
							</h2>
							<p className="text-primary font-bold mt-4 mb-2">
								Please check your email for a verification link.
							</p>
							<span className="text-primary font-bold">
								Didn&apos;t get an email?{" "}
								<Link
									to="/register"
									className="text-link hover:text-link_hover hover:underline transition-all">
									Resend
								</Link>
							</span>
						</div>
					</form>
					{/* OAuth */}
				</div>
			</div>
			{/* <div className="relative hidden md:block">
				<img
					alt="login image"
					className="absolute inset-0 object-cover "
					src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
				/>
			</div> */}
		</div>
	);
};

export default VerifyEmail;
