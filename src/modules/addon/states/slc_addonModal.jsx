import { createSlice } from '@reduxjs/toolkit';

const addonModalSlice = createSlice({
    name: 'addonModal',
    initialState: {
        records: [],
        rowSelectionConfig: {
            // enableClickSelection: true,
            // enableSelectionWithoutKeys: true,
            // checkboxes: false,
            // headerCheckbox: false,
            // editable: true,

            mode: 'singleRow',
            flex: 1,
            editable: true,
            suppressCellFocus: true,
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
export const { setRecords, setRowSelectionConfig, setSelectedRowCount, setRowToEdit } = addonModalSlice.actions;
