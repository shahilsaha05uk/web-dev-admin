import { createSlice } from '@reduxjs/toolkit';

const addServiceModalSlice = createSlice({
    name: 'addServiceModal',
    initialState: {
        records: [],
        rowSelectionConfig: {
            mode: 'singleRow',
            enableClickSelection: true,
            enableSelectionWithoutKeys: true,
            checkboxes: false,
            headerCheckbox: false,
        },
        rowToEdit: null,
        recordCount: 0,
        selectedRowCount: 0,
    },
    reducers: {
        // Add reducers here
        incrementCount: (state) => {
            state.recordCount += 1;
        },
        decrementCount: (state) => {
            state.recordCount -= 1;
        },
        appendRecord: (state, action) => {
            state.records.push(action.payload);
        },
        deleteRecord: (state, action) => {
            state.records = state.records.filter((record) => record.table_id !== action.payload.table_id);
        },
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
        },
    },
});

export const addServiceModalReducer = addServiceModalSlice.reducer;
export const { setRecords, setRowSelectionConfig, setSelectedRowCount, setRowToEdit, incrementCount, decrementCount } =
    addServiceModalSlice.actions;
