const Hero = () => {
	return (
		<div className="bg-background_alt pb-16">
			<div className="container mx-auto gap-2 mt-8 px-6">
				<h1 className="text-5xl md:text-6xl lg:text-7xl text-primary font-semibold tracking-tight animate__animated animate__bounce">
					Booking made
					<span className="bg-gradient-to-r from-dark_orange to-light_orange text-transparent bg-clip-text font-bold italic p-1">
						{" "}
						BETTER
					</span>
				</h1>
				<p className="mt-2 md:text-lg lg:text-xl text-secondary max-w-4xl">
					Find and book with ease with 4331Booking.
				</p>
			</div>
		</div>
	);
};

export default Hero;
