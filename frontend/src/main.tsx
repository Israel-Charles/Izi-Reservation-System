import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<QueryClientProvider client={queryClient}>
				<AppContextProvider>
					<SearchContextProvider>
						<App />
					</SearchContextProvider>
				</AppContextProvider>
			</QueryClientProvider>
		</ThemeContextProvider>
	</React.StrictMode>
);
