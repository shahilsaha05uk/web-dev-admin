import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import ErrorHandler from "./comp/misc/ErrorHandler.jsx";
import { Provider } from "react-redux";
import { store } from "./states/store.jsx";
import { BrowserRouter } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient({});
const API_KEY = "AIzaSyBzLgXX5J219z74hTjmzjayxs1-pwOfukY";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<ErrorHandler>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<APIProvider apiKey={API_KEY}>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</APIProvider>
				</QueryClientProvider>
			</Provider>
		</ErrorHandler>
	</StrictMode>
);
