import { Link } from "react-router-dom";
import { ResourceType } from "../../../backend/src/types/resource";

import {
    FaMapPin,
    FaUsers,
    FaRegClock,
    FaCalendarAlt,
} from "react-icons/fa";

import { LuTimer } from "react-icons/lu";

type Props = {
    resource: ResourceType;
};

const SearchResult = ({ resource }: Props) => {
    return (
        <div className="shadow-lg grid grid-cols-1 md:grid-cols-2 rounded-lg gap-3 bg-background_alt p-3">
            <div className="container flex place-items-center w-full h-40 md:h-full lg:h-full">
                <img
                    src={resource.imageUrls[0]}
                    alt="resource"
                    loading="lazy"
                    className="w-full h-full md:h-80 object-cover object-center rounded-lg p-"
                />
            </div>
            <div className="grid grid-rows-2 h-fit">
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            to={`/reserve/${resource._id}`}
                            className="flex text-xl font-bold text-primary cursor-pointer"
                        >
                            {resource.name}
                        </Link>
                        <span className="flex flex-row-reverse text-secondary text-right">{resource.type}</span>
                    </div>
                    <span className="grid grid-rows-1 grid-flow-col justify-start text-lg text-secondary italic">
                        <FaMapPin className="row-span-2 mr-2 pt-1 size-6" />
                        <span className="flex flex-wrap">
                            {resource.location}
                        </span>
                    </span>
                </div>

                <div >
                    <span className="text-secondary line-clamp-2 sm:line-clamp-3 mt-2 mb-2">
                        {resource.description}
                    </span>
                </div>

                <div className="">
                    <span className="grid grid-rows-1 grid-flow-col justify-start text-lg text-secondary mb-2">
                        <FaCalendarAlt className="row-span-2 mr-2 pt-1 size-6" />
                        <span className="flex flex-wrap">
                        {resource.days.slice(0, 7).map((day) => (
                            <span key={day} className="mr-2">
                                {day}
                            </span>
                        ))}
                        </span>
                        
                    </span>
                    <span className="grid grid-rows-1 grid-flow-col justify-start text-lg text-secondary">
                        <FaRegClock className="row-span-2 mr-2 pt-1 size-6" />
                        {resource.open} to {resource.close}
                    </span>
                    <div className="grid grid-rows-2 grid-flow-col items-center justify-between mt-2">
                        <span className="grid grid-rows-1 grid-flow-col justify-start text-lg text-secondary">
                            <LuTimer className="row-span-2 mr-2 pt-1 size-6" />
                            {resource.maxResLen} mins Max
                        </span>
                        <span className="grid grid-rows-1 grid-flow-col justify-start text-lg text-secondary">
                            <FaUsers className="row-span-2 mr-2 pt-1 size-6" />
                            {resource.maxResSize} person max
                        </span>
                        <Link
                            to={`/reserve/${resource._id}`}
                            className="row-span-2 rounded text-xl text-light_neutral bg-med_orange font-bold px-3 py-2 hover:bg-light_orange hover:shadow-lg transition-all"
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
