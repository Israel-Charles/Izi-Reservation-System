import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { TbInputSearch, TbMapPinSearch } from "react-icons/tb";
import { resourceTypes } from "../config/resource-options-config";
import { FaBuilding } from "react-icons/fa6";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useContext(SearchContext);

    const [name, setName] = useState<string>(search.name);
    const [location, setLocation] = useState<string>(search.location);
    const [type, setType] = useState<string>(search.type);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(name, location, type);
        navigate("/search");
    };

    const handleClear = () => {
        setName("");
        setLocation("");
        setType("");
        search.saveSearchValues("", "", "");
        navigate("/search");
    };

    return (
        <div className="container mx-auto -mt-12 lg:-mt-8 lg:-mb-[25px] px-6 z-10">
            <form
                onSubmit={handleSubmit}
                className="p-3 bg-background_alt rounded shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 "
            >
                <div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
                    <TbInputSearch size={25} className="text-primary mr-2" />
                    <input
                        id="searchName"
                        placeholder="What is the name?"
                        className="bg-background text-md text-primary w-full focus:outline-none"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
                    <TbMapPinSearch size={25} className="text-primary mr-2" />
                    <input
                        id="searchLocation"
                        placeholder="What is the location?"
                        className="bg-background text-md text-primary w-full focus:outline-none"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </div>
                <div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
                    <FaBuilding size={25} className="text-primary mr-2" />
                    <select
                        id="searchType"
                        className="bg-background text-md text-primary w-full"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="">What type is it?</option>
                        {resourceTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded w-2/3 bg-med_orange text-light_neutral h-full p-1.5 font-bold text-xl hover:bg-light_orange transition-all"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleClear}
                        className="rounded w-1/3 bg-error text-light_neutral h-full p-1.5 font-bold text-xl hover:bg-background hover:text-error transition-all"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
