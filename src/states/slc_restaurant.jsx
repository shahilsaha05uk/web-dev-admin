import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
	name: "restaurant",
	initialState: {
		records: [],
		rowSelectionConfig: {},
		selectedRowCount: 0,
	},
	reducers: {
		// Add reducers here
		setRecords: (state, action) => {
			state.records = action.payload;
		},
		setRowSelectionConfig: (state, action) => {
			state.rowSelectionConfig = action.payload;
		},
		setSelectedRowCount: (state, action) => {
			state.selectedRowCount = action.payload;
		},
	},
});

export const restaurantReducer = restaurantSlice.reducer;
export const { setRecords, setRowSelectionConfig, setSelectedRowCount } =
	restaurantSlice.actions;
