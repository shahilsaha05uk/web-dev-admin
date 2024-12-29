import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        records: [],
        rowSelectionConfig: {
            mode: "singleRow",
            enableClickSelection: true,
            enableSelectionWithoutKeys: true,
            checkboxes: true,
            headerCheckbox: false,
        },
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

export const serviceReducer = serviceSlice.reducer;
export const { setRecords, setRowSelectionConfig, setSelectedRowCount } =
    serviceSlice.actions;
