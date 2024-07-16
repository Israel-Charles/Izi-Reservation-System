import React, { useContext, useState } from "react";

type SearchContext = {
	name: string;
	location: string;
	maxLen: number;
	maxSize: number;
	type: string;
	open: string;
	close: string;
	days: string[];
	resourceId: string;
	saveSearchValues: (
		name: string,
		location: string,
		maxLen: number,
		maxSize: number,
		type: string,
		open: string,
		close: string,
		days: string[]
	) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
	children: React.ReactNode;
};

export const SearchContextProvider = ({
	children,
}: SearchContextProviderProps) => {
	const [name, setName] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [maxLen, setMaxLen] = useState<number>(15);
	const [maxSize, setMaxSize] = useState<number>(1);
	const [type, setType] = useState<string>("");
	const [open, setOpen] = useState<string>("");
	const [close, setClose] = useState<string>("");
	const [days, setDays] = useState<string[]>([]);
	const [resourceId, setResourceId] = useState<string>("");

	const saveSearchValues = (
		name: string,
		location: string,
		maxLen: number,
		maxSize: number,
		type: string,
		open: string,
		close: string,
		days: string[],
		resourceId?: string
	) => {
		setName(name);
		setLocation(location);
		setMaxLen(maxLen);
		setMaxSize(maxSize);
		setType(type);
		setOpen(open);
		setClose(close);
		setDays(days);
		if (resourceId) setResourceId(resourceId);
	};

	return (
		<SearchContext.Provider
			value={{
				name,
				location,
				maxLen,
				maxSize,
				type,
				open,
				close,
				days,
				resourceId,
				saveSearchValues,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	return context as SearchContext;
};
