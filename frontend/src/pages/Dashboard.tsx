const Dashboard = () => {
	return (
		<div className="container mx-auto p-6 my-0 lg:my-4">
			<span className="flex items-center justify-between">
				<h1 className="text-lg lg:text-3xl text-primary font-bold">You have 4 Upcoming Reservation(s)</h1>
			</span>
			<div className="grid grid-cols-1 gap-8 bg-background rounded-lg shadow-lg"></div>
		</div>
	);
};

export default Dashboard;
