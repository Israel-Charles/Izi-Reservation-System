import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import {
	FaMapPin,
	FaBuilding,
	FaUsers,
	FaRegClock,
	FaCalendarAlt,
} from "react-icons/fa";
import { LuTimer } from "react-icons/lu";

const MyResources = () => {
	const { data: resourceData } = useQuery(
		"getMyResources",
		apiClient.getMyResources,
		{
			onError: () => {},
		}
	);

	return (
		<div className="container mx-auto px-6 my-14 space-y-5">
			<span className="flex justify-between">
				<h1 className="text-3xl text-primary font-bold">My Resources</h1>
				<Link
					to="/add-resource"
					className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all">
					Add Resource
				</Link>
			</span>
			{!resourceData || resourceData.length === 0 ? (
				<span className="flex justify-center text-2xl text-secondary font-bold">
					No resources found
				</span>
			) : (
				<div className="grid grid-cols-1 gap-8">
					{resourceData.map((resource) => (
						<div
							key={resource.name}
							className="flex flex-col bg-background_alt text-primary justify-between rounded-lg p-6 gap-6">
							<h2 className="text-2xl font-bold">{resource.name}</h2>
							<div className="whitespace-pre-line">{resource.description}</div>
							<div className="grid grid-cols-3 gap-2">
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<FaMapPin className="mr-2" />
									{resource.location}
								</div>
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<FaBuilding className="mr-2" />
									{resource.type}
								</div>
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<LuTimer className="mr-2" />
									{resource.maxResLen} minutes max
								</div>
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<FaUsers className="mr-2" />
									{resource.maxResSize} person(s) max
								</div>
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<FaRegClock className="mr-2" />
									{resource.open} - {resource.close}
								</div>
								<div className="bg-background rounded p-3 flex items-center justify-center">
									<FaCalendarAlt className="mr-2" />
									{resource.days.join(", ")}
								</div>
							</div>
							<span className="flex justify-between">
								<button
									// onClick={handleDeleteResource}
									className="rounded text-xl text-error bg-background font-bold px-3 py-2 hover:bg-error hover:text-light_neutral hover:shadow-lg transition-all">
									Delete
								</button>
								<div className="flex items-center gap-4">
									<Link
										to={`/reservations/${resource._id}`}
										className="rounded text-xl text-med_orange bg-background font-bold px-3 py-2 hover:bg-med_orange hover:text-light_neutral hover:shadow-lg transition-all">
										Reservations
									</Link>
									<Link
										to={`/edit-resource/${resource._id}`}
										className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all">
										Edit
									</Link>
								</div>
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyResources;
