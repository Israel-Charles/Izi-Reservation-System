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

	if (!resourceData)
		return (
			<span className="text-4xl text-primary font-bold">
				No resources found
			</span>
		);

	return (
		<div className="space-y-5">
			<span className="flex justify-between">
				<h1 className="text-3xl text-primary font-bold">My Resources</h1>
				<Link
					to="/add-resource"
					className="flex bg-med_orange text-primary text-xl font-bold p-2 hover:bg-dark_orange">
					Add Resource
				</Link>
			</span>
			<div className="grid grid-cols-1 gap-8">
				{resourceData.map((resource) => (
					<div
						key={resource.name}
						className="flex flex-col bg-light_neutral justify-between border-2 border-tertiary rounded-lg p-8 gap-5">
						<h2 className="text-2xl font-bold">{resource.name}</h2>
						<div className="whitespace-pre-line">{resource.description}</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<FaMapPin className="mr-2" />
								{resource.location}
							</div>
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<FaBuilding className="mr-2" />
								{resource.type}
							</div>
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<LuTimer className="mr-2" />
								{resource.maxResLen} minutes max
							</div>
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<FaUsers className="mr-2" />
								{resource.maxResSize} person(s) max
							</div>
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<FaRegClock className="mr-2" />
								{resource.open} - {resource.close}
							</div>
							<div className="border border-secondary rounded-sm p-3 flex items-center">
								<FaCalendarAlt className="mr-2" />
								{resource.days.join(", ")}
							</div>
						</div>
						<span className="flex justify-end">
							<Link
								to={`/edit-resource/${resource._id}`}
								className="flex bg-med_orange text-primary text-xl font-bold p-2 hover:bg-dark_orange">
								Edit Resource
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyResources;
