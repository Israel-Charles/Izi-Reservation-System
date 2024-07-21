import { Link } from "react-router-dom";
import { ResourceType } from "../../../backend/src/types/resource";

type Props = {
    resource: ResourceType;
};

const SearchResult = ({ resource }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] rounded-lg gap-6 bg-background_alt p-3">
            <div className="w-full h-[320px]">
                <img
                    src={resource.imageUrls[0]}
                    alt="resource"
                    className="w-full h-full object-cover object-center rounded-lg"
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_2fr]">
                <div>
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/reserve/${resource._id}`}
                            className="text-xl font-bold text-primary cursor-pointer"
                        >
                            {resource.name}
                        </Link>
                        <span className="text-secondary">{resource.type}</span>
                    </div>
                    <span className="text-lg text-secondary">
                        {resource.location}
                    </span>
                </div>

                <div>
                    <span className="text-secondary line-clamp-4">
                        {resource.description}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-lg text-secondary">
                        {resource.days.slice(0, 3).map((day) => (
                            <span key={day} className="mr-2">
                                {day}
                            </span>
                        ))}
                    </span>
                    <span className="text-lg text-secondary">
                        {resource.open} to {resource.close}
                    </span>
                    <span className="text-lg text-secondary">
                        {resource.maxResLen} max time length
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-lg text-secondary">
                            {resource.maxResSize} person max
                        </span>
                        <Link
                            to={`/reserve/${resource._id}`}
                            className="rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;