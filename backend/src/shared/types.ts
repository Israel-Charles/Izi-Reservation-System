export type UserType = {
	_id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	imageUrl: string;
};

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
	close: string;
	days: string[];
	imageFiles: string[];
	lastUpdated: Date;
};

export type ReservationType = {
	_id: string;
	userId: string;
	resourceId: string;
	comment: string;
	groupSize: number;
	start: Date;
	end: Date;
	lastUpdated: Date;
};