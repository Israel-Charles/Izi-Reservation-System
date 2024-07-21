import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useContext, useState } from "react";
import SearchResult from "../components/SearchResult";
import { SearchContext } from "../contexts/SearchContext";

const Search = () => {
    const search = useContext(SearchContext);
    const [page, setPage] = useState<number>(1);

    const searchParams = {
        name: search.name,
        location: search.location,
        maxResLen: search.maxResLen,
        maxResSize: search.maxResSize,
        type: search.type,
        open: search.open,
        close: search.close,
        days: search.days,
        page: page.toString(),
    };

    const { data: resourceData } = useQuery(
        ["searchResources", searchParams],
        () => apiClient.searchResources(searchParams)
    );

    return (
        <div className="container mx-auto px-6 mt-60 mb-14 lg:mt-32">
            <span className="text-2xl font-bold text-primary">
                {resourceData?.pagination.total} Resources found{" "}
                {search.destination ? `for ${search.destination}` : ""}
            </span>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resourceData?.data.map((resource) => (
                    <SearchResult resource={resource} key={resource._id} />
                ))}
            </div>
        </div>
    );
};

export default Search;
