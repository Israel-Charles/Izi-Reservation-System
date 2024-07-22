export type ResourceType = {
    _id: string;
    userId: string;
    name: string;
    location: string;
    description: string;
    maxResLen: number;
    maxResSize: number;
    type: string;
    open: string;
    openMinutes: number;
    close: string;
    closeMinutes: number;
    days: string[];
    imageUrls: string[];
};

export type ResourceSearchResponse = {
    data: ResourceType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};
