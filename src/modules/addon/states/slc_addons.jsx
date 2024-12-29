import { createSlice } from "@reduxjs/toolkit";

const addonSlice = createSlice({
    name: "addon",
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

export const addonReducer = addonSlice.reducer;
export const { setRecords, setRowSelectionConfig, setSelectedRowCount } =
    addonSlice.actions;
