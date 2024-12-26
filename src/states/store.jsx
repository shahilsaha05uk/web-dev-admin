import { configureStore } from "@reduxjs/toolkit";
import { serviceReducer } from "./slc_services";
import { addServiceModalReducer } from "./slc_serviceModal";
import { addonReducer } from "./slc_addons";
import { addonModalReducer } from "./slc_addonModal";

export const store = configureStore({
	reducer: {
		// Add reducers here
		service: serviceReducer,
		addon: addonReducer,
		addonModal: addonModalReducer,
		addServiceModal: addServiceModalReducer,
	},
});

export const RootState = typeof store.getState;
export const AppDispatch = typeof store.dispatch;
