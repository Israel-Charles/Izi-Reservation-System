import 'animate.css';

const Welcome = () => {
	return (
		<div className="bg-background_alt pb-16">
			<div className="container mx-auto gap-2 mt-8 px-6">
				<h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold tracking-tight">
					Welcome
					<span className="bg-gradient-to-r from-dark_orange to-light_orange text-transparent bg-clip-text font-bold italic p-1 animate__animated animate__bounce">
						{" "}
						John
					</span>
				</h2>
				<p className="mt-2 md:text-lg lg:text-xl text-secondary">
					You have 4 Upcoming Reservation(s)
				</p>
			</div>
		</div>
	);
};

export default Welcome;