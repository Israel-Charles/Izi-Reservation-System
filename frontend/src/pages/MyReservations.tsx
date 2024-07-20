const MyReservations = () => {
	return (
		<div className="container mx-auto p-6 my-14">
			<span className="flex items-center justify-between">
				<h1 className="text-3xl text-primary font-bold">My Reservations</h1>
			</span>
			<div className="grid grid-cols-1 gap-8 bg-background rounded-lg shadow-lg"></div>
		</div>
	);
};

export default MyReservations;
