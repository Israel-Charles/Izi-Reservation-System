import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { TbInputSearch, TbMapPinSearch } from "react-icons/tb";
import { resourceTypes, dayTypes } from "../config/resource-options-config";
import { FaBuilding } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const SearchBar = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const search = useContext(SearchContext);

    const [name, setName] = useState<string>(search.name);
    const [location, setLocation] = useState<string>(search.location);
    const [maxLen, setMaxLen] = useState<number>(search.maxLen);
    const [maxSize, setMaxSize] = useState<number>(search.maxSize);
    const [type, setType] = useState<string>(search.type);
    const [open, setOpen] = useState<string>(search.open);
    const [close, setClose] = useState<string>(search.close);
    const [days, setDays] = useState<string[]>(search.days);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleSelectionChange = (day) => {
        if (days.includes(day)) {
            setDays(days.filter((t) => t !== day));
        } else {
            setDays([...days, day]);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            name,
            location,
            maxLen,
            maxSize,
            type,
            open,
            close,
            days
        );
        navigate("/search");
    };
    return (
        <div className="container mx-auto -mt-8 -mb-[210px] lg:-mb-[100px] px-6 z-10">
            <form
                onSubmit={handleSubmit}
                className="p-3 bg-gradient-to-r from-dark_orange to-light_orange rounded shadow-sm grid grid-cols-2 lg:grid-cols-4 items-center gap-4"
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
                <div className="flex flex-row items-center flex-1 bg-background px-2 py-1 gap-2 rounded">
                    <label className="items-center flex text-primary">
                        Length:
                        <input
                            id="searchLength"
                            className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
                            type="number"
                            min={15}
                            max={300}
                            step={15}
                            value={maxLen}
                            onChange={(event) =>
                                setMaxLen(parseInt(event.target.value))
                            }
                        />
                    </label>
                    <label className="items-center flex text-primary">
                        Group:
                        <input
                            id="searchSize"
                            className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
                            type="number"
                            min={1}
                            max={50}
                            value={maxSize}
                            onChange={(event) =>
                                setMaxSize(parseInt(event.target.value))
                            }
                        />
                    </label>
                </div>
                <div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
                    <FaBuilding size={25} className="text-primary mr-2" />
                    <select
                        id="searchType"
                        className="bg-background text-md text-primary w-full"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="">Select a type</option>
                        {resourceTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row items-center flex-1 bg-background p-1 rounded">
                    <label className="items-center flex text-primary">
                        Open:
                        <input
                            id="searchOpen"
                            className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
                            type="time"
                            value={open}
                            onChange={(event) => setOpen(event.target.value)}
                        />
                    </label>
                </div>
                <div className="flex flex-row items-center flex-1 bg-background p-1 rounded">
                    <label className="items-center flex text-primary">
                        Close:
                        <input
                            id="searchClose"
                            className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
                            type="time"
                            value={close}
                            onChange={(event) => setClose(event.target.value)}
                        />
                    </label>
                </div>
                <div
                    className="flex flex-row items-center flex-1 bg-background p-2 rounded text-primary cursor-pointer"
                    onClick={() => setShowDropdown(true)}
                    ref={dropdownRef}
                >
                    <FaCalendarAlt size={25} className="mr-2" />
                    {days.length > 0 ? days.join(", ") : "Select days"}
                    {showDropdown && (
                        <div
                            id="searchDays"
                            className="absolute bg-background border-[1px] p-3 border-secondary text-primary shadow-lg mt-1"
                        >
                            {dayTypes.map((day) => (
                                <div
                                    key={day}
                                    onClick={() => handleSelectionChange(day)}
                                >
                                    <input
                                        name={day}
                                        type="checkbox"
                                        multiple
                                        checked={days.includes(day)}
                                    />{" "}
                                    {day}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    <button className="rounded w-2/3 bg-background_alt text-med_orange h-full p-1.5 font-bold text-xl hover:bg-background transition-all">
                        Search
                    </button>
                    <button className="rounded w-1/3 bg-background_alt text-error h-full p-1.5 font-bold text-xl hover:bg-background transition-all">
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
