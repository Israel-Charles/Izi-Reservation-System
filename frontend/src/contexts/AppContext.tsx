import React, { createContext, useState, useMemo, useCallback } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

export const AppContext = createContext();

export function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [toast, setToast] = useState(undefined);

	const { isError } = useQuery("authenticate", apiClient.authenticate, {
		retry: false,
		enabled: true,
	});

	const showToast = useCallback((toastMessage) => {
		setToast(toastMessage);
	}, []);

	const value = useMemo(
		() => ({
			showToast,
			isLoggedIn: !isError,
		}),
		[showToast, isError]
	);

	return (
		<AppContext.Provider value={value}>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	);
}
