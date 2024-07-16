import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";

const Search = () => {
	const search = useSearchContext();
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

	return <>Search Page</>;
};

export default Search;
