import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "core_components/page/Page";
import LoginPage from "auth/LoginPage";

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
