import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { ResourceType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
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

export const validateToken = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Token invalid");
	}

	return response.json();
};

export const signOut = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to sign out");
	}
};

export const addMyResource = async (resourceFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-resources`, {
		method: "POST",
		credentials: "include",
		body: resourceFormData,
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}

	return responseBody;
};

export const getMyResources = async (): Promise<ResourceType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-resources`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error fetching resources");
	}

	return response.json();
};

export const getMyResourceById = async (
	resourceId: string
): Promise<ResourceType> => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-resources/${resourceId}`,
		{
			credentials: "include",
		}
	);

	if (!response.ok) {
		throw new Error("Error fetching resource");
	}

	return response.json();
};

export const updateMyResourceById = async (resourceFormData: FormData) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-resources/${resourceFormData.get("resourceId")}`,
		{
			method: "PUT",
			credentials: "include",
			body: resourceFormData,
		}
	);

	if (!response.ok) {
		throw new Error("Failed to update resource");
	}

	return response.json();
};
