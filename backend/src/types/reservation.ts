export type ReservationType = {
    _id: string;
    userId: string;
    resourceId: string;
    comment: string;
    start: Date;
    end: Date;
    size: number;
};
