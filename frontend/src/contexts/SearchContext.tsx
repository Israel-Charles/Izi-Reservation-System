import React, { useState } from "react";

type SearchContext = {
    name: string;
    location: string;
    type: string;
    resourceId: string;
    saveSearchValues: (name: string, location: string, type: string) => void;
};

export const SearchContext = React.createContext<SearchContext | undefined>(
    undefined
);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [resourceId, setResourceId] = useState<string>("");

    const saveSearchValues = (
        name: string,
        location: string,
        type: string,
        resourceId?: string
    ) => {
        setName(name);
        setLocation(location);
        setType(type);
        if (resourceId) setResourceId(resourceId);
    };

    return (
        <SearchContext.Provider
            value={{
                name,
                location,
                type,
                resourceId,
                saveSearchValues,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};