import { configureStore } from "@reduxjs/toolkit";
import { restaurantReducer } from "./slc_restaurant";
import { addModalReducer } from "./slc_addModal";

export const store = configureStore({
	reducer: {
		// Add reducers here
		restaurant: restaurantReducer,
		addModal: addModalReducer,
	},
});

export const RootState = typeof store.getState;
export const AppDispatch = typeof store.dispatch;
