import { createSlice } from "@reduxjs/toolkit";

const addModalSlice = createSlice({
	name: "addModal",
	initialState: {
		records: [],
		rowSelectionConfig: {},
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

export const addModalReducer = addModalSlice.reducer;
export const {
	setRecords,
	setRowSelectionConfig,
	setSelectedRowCount,
	setRowToEdit,
} = addModalSlice.actions;
