import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./comp/Page";
import "./styles.css";
import LoginPage from "./comp/pages/LoginPage";
import { Route, Routes } from "react-router-dom";

const queryClient = new QueryClient({});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<Page />} />
				<Route path="/auth" element={<LoginPage />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
