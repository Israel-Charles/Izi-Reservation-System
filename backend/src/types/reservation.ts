export type ReservationType = {
    _id: string;
    userId: string;
    resourceId: string;
    comment: string;
    start: Date;
    startMinutes: number;
    end: Date;
    endMinutes: number;
    size: number;
};
