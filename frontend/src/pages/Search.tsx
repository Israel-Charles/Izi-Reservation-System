import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useContext, useState } from "react";
import SearchResult from "../components/SearchResult";
import { SearchContext } from "../contexts/SearchContext";
import Pagination from "../components/Pagination";
import LengthFilter from "../components/LengthFilter";
import SizeFilter from "../components/SizeFilter";
import DaysFilter from "../components/DaysFilter";
import OpenFilter from "../components/OpenFilter";
import CloseFilter from "../components/CloseFilter";

const Search = () => {
    const search = useContext(SearchContext);
    const [page, setPage] = useState<number>(1);
    const [length, setLength] = useState<number>(15);
    const [size, setSize] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [open, setOpen] = useState<string>("");
    const [close, setClose] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        name: search.name,
        location: search.location,
        type: search.type,
        page: page.toString(),
        maxResLen: length,
        maxResSize: size,
        days: selectedDays,
        open,
        close,
        sortOption,
    };

    const { data: resourceData } = useQuery(
        ["searchResources", searchParams],
        () => apiClient.searchResources(searchParams)
    );

    const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const day = event.target.value;
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <div className="container mx-auto mt-2 lg:mt-8 pt-6 pb-6 px-2 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-3">
                <div className="bg-background_alt rounded-lg shadow-lg p-3 h-fit lg:w-fit lg:sticky top-28">
                    <div className="space-y-3 grid gap-x-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 lg:w-fit">
                        <h3 className="col-span-full text-xl text-center text-primary font-semibold pb-3">
                            Filter
                        </h3>
                        <LengthFilter
                            length={length}
                            onChange={(value?: number) =>
                                setLength(value || 15)
                            }
                        />
                        <SizeFilter
                            size={size}
                            onChange={(value?: number) => setSize(value || 1)}
                        />
                        <OpenFilter
                            open={open}
                            onChange={(value?: string) => setOpen(value)}
                        />
                        <CloseFilter
                            close={close}
                            onChange={(value?: string) => setClose(value)}
                        />
                        <DaysFilter
                            selectedDays={selectedDays}
                            onChange={handleDaysChange}
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <div className="p-2 flex flex-wrap text-lg sm:text-xl lg:text-2xl gap-1 lg:gap-2 font-bold text-med_orange">
                            <span>{resourceData?.pagination.total}</span>
                            <span className="font-semibold text-primary">
                                Resource(s) found
                            </span>
                            {search.name && (
                                <>
                                    <span className="font-semibold text-primary">
                                        named
                                    </span>
                                    <span>{search.name}</span>
                                </>
                            )}
                            {search.location && (
                                <>
                                    <span className="font-semibold text-primary">
                                        in
                                    </span>
                                    <span>{search.location}</span>
                                </>
                            )}
                            {search.type && (
                                <>
                                    <span className="font-semibold text-primary">
                                        as a
                                    </span>
                                    <span>{search.type}</span>
                                </>
                            )}
                        </div>
                        <div className="">
                            <select
                                id="sortBy"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="w-20 sm:w-40 md:w-60 lg:w-auto rounded-lg p-2 shadow-lg font-semibold bg-background_alt lg:text-lg text-primary"
                            >
                                <option value="">Sort</option>
                                <option value="maxResLenAsc">
                                    Duration (Shortest to Longest)
                                </option>
                                <option value="maxResLenDesc">
                                    Duration (Longest to Shortest)
                                </option>
                                <option value="maxResSizeAsc">
                                    Group Size (Smallest to Biggest)
                                </option>

                                <option value="maxResSizeDesc">
                                    Group Size (Biggest to Smallest)
                                </option>
                                <option value="openAsc">
                                    Open Time (Earliest to Latest)
                                </option>
                                <option value="openDesc">
                                    Open Time (Latest to Earliest)
                                </option>
                                <option value="closeAsc">
                                    Close Time (Earliest to Latest)
                                </option>
                                <option value="closeDesc">
                                    Close Time (Latest to Earliest)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {resourceData?.data.map((resource) => (
                            <SearchResult
                                resource={resource}
                                key={resource._id}
                            />
                        ))}
                    </div>
                    <div>
                        <Pagination
                            page={resourceData?.pagination.page || 1}
                            pages={resourceData?.pagination.pages || 1}
                            onPageChange={(page) => setPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
