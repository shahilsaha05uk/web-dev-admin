// Third party imports
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { APIProvider } from '@vis.gl/react-google-maps';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { store } from './store.jsx';
import ErrorHandler from './modules/core/components/misc/ErrorHandler.jsx';
import App from './App.jsx';

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient({});
const API_KEY = 'AIzaSyBzLgXX5J219z74hTjmzjayxs1-pwOfukY';

const rootElement = document.getElementById('root');
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
    </StrictMode>,
);
