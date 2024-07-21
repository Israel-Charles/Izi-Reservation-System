import { LuTimer } from "react-icons/lu";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";
import React, { useContext, useState, useEffect } from "react";
import { FaBuilding, FaMapPin, FaRegClock, FaUsers } from "react-icons/fa6";

const ViewResource = () => {
	const { showToast } = useContext(AppContext);
	const { resourceId } = useParams();
	const [resource, setResource] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchResource = async () => {
			if (!resourceId) return;
			setIsLoading(true);
			try {
				const data = await apiClient.getResourceById(resourceId);
				setResource(data.resource);
			} catch (error) {
				showToast("Error fetching resource", "error");
			} finally {
				setIsLoading(false);
			}
		};

		fetchResource();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!resource) {
		return <div>Resource not found</div>;
	}

	return (
		<div className="container mx-auto p-6 my-14 bg-background_alt rounded-lg shadow-lg">
			<h1 className="text-3xl text-primary font-bold mb-3">{resource.name}</h1>
			<div className="flex gap-4 text-primary font-bold">
				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2">
						<FaMapPin />
						<span>{resource.location}</span>
					</span>
					<span className="flex items-center gap-2">
						<FaBuilding />
						<span>{resource.description}</span>
					</span>
					<span className="flex items-center gap-2">
						<FaUsers />
						<span>{resource.maxResSize}</span>
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2">
						<FaRegClock />
						<span>{resource.open}</span>
					</span>
					<span className="flex items-center gap-2">
						<FaCalendarAlt />
						<span>{resource.close}</span>
					</span>
					<span className="flex items-center gap-2">
						<LuTimer />
						<span>{resource.maxResLen}</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ViewResource;
