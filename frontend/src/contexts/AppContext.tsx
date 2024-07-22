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
    const [toast, setToast] = useState(null);

    const { isError } = useQuery("authenticate", apiClient.authenticate);

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
                    onClose={() => setToast(null)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
}
