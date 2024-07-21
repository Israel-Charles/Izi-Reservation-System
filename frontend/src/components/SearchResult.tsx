import { Link } from "react-router-dom";
import { ResourceType } from "../../../backend/src/types/resource";

type Props = {
    resource: ResourceType;
};

const SearchResult = ({ resource }: Props) => {
    return (
        <div>
            <div className="flex gap-6 bg-background_alt p-6 rounded-lg shadow-lg">
                <div className="w-2/5 h-[300px]">
                    <img
                        src={resource.imageUrls[0]}
                        alt="resource"
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-primary">
                            {resource.name}
                        </span>
                        <span className="text-lg text-secondary">
                            {resource.type}
                        </span>
                        <span className="text-lg text-secondary">
                            {resource.location}
                        </span>
                        <span className="text-lg text-secondary">
                            {resource.days.slice(0, 7).map((day) => (
                                <span key={day} className="mr-2">
                                    {day}
                                </span>
                            ))}
                        </span>
                        <span className="text-lg text-secondary">
                            {resource.maxResLen} mins max length
                        </span>
                        <span className="text-lg text-secondary">
                            {resource.maxResSize} max per group
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-lg text-secondary">
                                Open from {resource.open} to {resource.close}
                            </span>
                            <Link
                                to={`/resource/${resource._id}`}
                                className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
