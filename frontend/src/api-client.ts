import { SignInFormData } from "./pages/SignIn";
import { ProfileFormData } from "./pages/Profile";
import { RegisterFormData } from "./pages/Register";
import { ResetFormData } from "./pages/ResetPassword";
import { ForgotFormData } from "./pages/ForgotPassword";
import { ResourceFormData } from "./forms/ManageResourceForm/ManageResourceForm";
import { ReservationFormData } from "./forms/MakeReservationForm/MakeReservationForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// (put before response in async function to test loading state)
// await new Promise((resolve) => setTimeout(resolve, 10000));

// auth
export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const signIn = async (formData: SignInFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const verifyEmail = async (verificationToken: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/auth/email/verify/${verificationToken}`,
		{
			method: "GET",
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const signOut = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: "GET",
		credentials: "include",
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const forgotPassword = async (formData: ForgotFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/password/forgot`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const resetPassword = async (
	resetToken: string,
	formData: ResetFormData
) => {
	const response = await fetch(
		`${API_BASE_URL}/api/auth/password/reset/${resetToken}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const authenticate = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/`, {
		method: "GET",
		credentials: "include",
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

// users
export const getProfile = async () => {
	const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
		method: "GET",
		credentials: "include",
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody.user;
};

export const updateProfile = async (formData: ProfileFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const deleteProfile = async () => {
	const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
		method: "DELETE",
		credentials: "include",
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const getMyResources = async () => {
	const response = await fetch(`${API_BASE_URL}/api/users/my-resources`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching resources");
	}

	return response.json();
};

export const addResource = async (formData: ResourceFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/my-resources`, {
		method: "POST",
		credentials: "include",
		body: formData,
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const updateResource = async (resourceFormData: FormData) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-resources/${resourceFormData.get("resourceId")}`,
		{
			method: "PUT",
			credentials: "include",
			body: resourceFormData,
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const deleteResource = async (resourceId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-resources/${resourceId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const getMyReservations = async () => {
	const response = await fetch(`${API_BASE_URL}/api/users/my-reservations`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching reservations");
	}

	return response.json();
};

// resources
export const getAllResources = async () => {
	const response = await fetch(`${API_BASE_URL}/api/resources`);

	if (!response.ok) {
		throw new Error("Error fetching resources");
	}

	return response.json();
};

export const getResourceById = async (resourceId: string) => {
	const response = await fetch(`${API_BASE_URL}/api/resources/${resourceId}`);

	if (!response.ok) {
		throw new Error("Error fetching resource");
	}

	return response.json();
};

export const getResourceReservations = async (resourceId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/resources/${resourceId}/reservations`
	);

	if (!response.ok) {
		throw new Error("Error fetching resource reservations");
	}

	return response.json();
};

// reservations
export const makeReservation = async (
	formData: ReservationFormData,
	resourceId: string
) => {
	const response = await fetch(
		`${API_BASE_URL}/api/reservations/${resourceId}`,
		{
			method: "POST",
			credentials: "include",
			body: formData,
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const getReservationById = async (reservationId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/reservations/${reservationId}`
	);

	if (!response.ok) {
		throw new Error("Error fetching reservation");
	}

	return response.json();
};

export const cancelReservation = async (reservationId: string) => {
	const response = await fetch(
		`${API_BASE_URL}/api/reservations/${reservationId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

// export type SearchParams = {
// 	name?: string;
// 	location?: string;
// 	maxResLen?: number;
// 	maxResSize?: number;
// 	type?: string;
// 	open?: string;
// 	close?: string;
// 	days?: string[];
// 	page?: string;
// };

// export const searchResources = async (
// 	searchParams: SearchParams
// ): Promise<ResourceSearchResponse> => {
// 	const queryParams = new URLSearchParams();
// 	queryParams.append("name", searchParams.name || "");
// 	queryParams.append("location", searchParams.location || "");
// 	queryParams.append("maxResLen", searchParams.maxResLen.toString() || "");
// 	queryParams.append("maxResSize", searchParams.maxResSize.toString() || "");
// 	queryParams.append("type", searchParams.type || "");
// 	queryParams.append("open", searchParams.open || "");
// 	queryParams.append("close", searchParams.close || "");
// 	queryParams.append("days", searchParams.days.join(",") || "");
// 	queryParams.append("page", searchParams.page || "");

// 	const response = await fetch(
// 		`${API_BASE_URL}/api/resources/search?${queryParams}`
// 	);

// 	if (!response.ok) {
// 		throw new Error("Failed to search resources");
// 	}

// 	return response.json();
// };
