import { createSlice } from "@reduxjs/toolkit";

const addonModalSlice = createSlice({
	name: "addonModal",
	initialState: {
		records: [],
		rowSelectionConfig: {
			mode: "singleRow",
			enableClickSelection: true,
			enableSelectionWithoutKeys: true,
			checkboxes: false,
			headerCheckbox: false,
		},
		rowToEdit: null,
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
		setRowToEdit: (state, action) => {
			state.rowToEdit = action.payload;
			console.log(action.payload);
		},
	},
});

export const addonModalReducer = addonModalSlice.reducer;
export const {
	setRecords,
	setRowSelectionConfig,
	setSelectedRowCount,
	setRowToEdit,
} = addonModalSlice.actions;
