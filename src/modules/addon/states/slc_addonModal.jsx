import { createSlice } from '@reduxjs/toolkit';

const addonModalSlice = createSlice({
    name: 'addonModal',
    initialState: {
        records: {},
        rowSelectionConfig: {
            checkboxes: true,
            mode: 'multiRow',
            editable: true,
            suppressCellFocus: true,
        },
        rowToEdit: null,
        selectedRowCount: 0,
    },
    reducers: {
        // Add reducers here
        createEmptyRecord: (state, action) => {
            const { row, service_id } = action.payload;

            const recs = state.records[service_id] || [];
            state.records = {
                ...state.records,
                [service_id]: [...recs, row],
            };
        },
        addRecords: (state, action) => {
            const { serviceId, newRecords } = action.payload;
            state.records = {
                ...state.records,
                [serviceId]: newRecords, // Replace the array for the specific serviceId
            };
        },
        updateRecord: (state, action) => {
            // Retrieve the field, itemID (table ID), and row from the action payload
            const { field, itemID, row } = action.payload;

            // Get the records for the given itemID (table ID)
            const records = state.records;
            const fRec = records[itemID] || []; // Fallback to an empty array if undefined

            // Find the index of the row to update
            const index = fRec.findIndex((element) => element.table_id === row.table_id);

            if (index === -1) {
                console.warn(`Row with table_id ${row.table_id} not found for itemID ${itemID}`);
                return;
            }

            // Create a new copy of the array with the updated row
            const updatedRecords = [...fRec];
            updatedRecords[index] = { ...fRec[index], ...row }; // Merge existing row with updated row

            state.records = {
                ...state.records,
                [itemID]: updatedRecords,
            };

            console.log(state.records);
        },
        deleteRecords: (state, action) => {
            const { records, service_id } = action.payload;

            console.log('New Records:', service_id);

            state.records = {
                ...state.records,
                [service_id]: records,
            };
        },
        setRecords: (state, action) => {
            records = action.payload;
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
    createEmptyRecord,
    addRecords,
    updateRecord,
    deleteRecords,
    setRecords,
    setRowSelectionConfig,
    setSelectedRowCount,
    setRowToEdit,
} = addonModalSlice.actions;
