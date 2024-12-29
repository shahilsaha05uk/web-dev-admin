import { Box, Modal, Stack } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import PanelButton from 'core_components/buttons/PanelButton';
import DGTable from 'core_components/tables/DGTable';
import ServiceList from './ServiceList';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecords, createEmptyRecord, updateRecord } from 'addon/states/slc_addonModal';
import { GetRowData } from 'helper/table_helper';
import { AddonSchema } from 'addon/schema/addon_schema';
import { isTheSameIndex } from '../utils/addon_helper';
import { clearRecords, deleteRecords } from '../states/slc_addonModal';
import usePostAddonDetails from '../hooks/usePostAddonDetails';

export default function AddAddonModal({ open, onClose }) {
    //#region  Properties
    // References and States
    const tableRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
    const [rows, setRows] = useState([]);
    const [selectedListItem, setSelectedItem] = useState(null);
    const [tableCount, setTableCount] = useState(0);

    // Redux State
    const records = useSelector((state) => state.addonModal.records);
    const rowSelectionConfig = useSelector((state) => state.addonModal.rowSelectionConfig);
    const dispatch = useDispatch();

    // Mutate API Hook
    const { mutate } = usePostAddonDetails();
    //#endregion Properties

    //#region  Effects
    // Sync Redux Records with Table Rows
    useEffect(() => {
        if (selectedListItem && records[selectedListItem.itemID]) {
            setRows(records[selectedListItem.itemID]);
        }

        console.log('Records:', records);
    }, [records, selectedListItem]);
    //#endregion Effects

    //#region Grid Callbacks
    const onGridReady = (params) => setGridApi(params.api);

    // Handle Service List Item Click
    const handleOnListItemClicked = (event, index, itemID) => {
        if (!selectedListItem) {
            setSelectedItem({ index, itemID });
            setTableData(itemID);
            return;
        }

        if (isTheSameIndex(selectedListItem.index, index)) return;

        // Save current service data and load new service data
        saveData(selectedListItem.itemID);
        setTableData(itemID);
        setSelectedItem({ index, itemID });
    };

    // On Cell Editing Stopped
    const onCellEditingStopped = useCallback(() => {
        if (gridApi) gridApi.clearFocusedCell();
    }, [gridApi]);
    //#endregion

    //#region Button Handlers
    // When the save button is clicked, it will send the data to the API to save them to the database
    const handleOnSaveButtonClick = () => {
        console.log('Records:', records);
        mutate(records);
        resetEverything();
        if (onClose) onClose();
    };

    // when the add row button is clicked, it will add a new empty row in the table
    const handleOnAddRowButtonClick = () => {
        if (gridApi && selectedListItem) {
            const newRow = { table_id: tableCount };
            gridApi.applyTransaction({ add: [newRow] });
            setTableCount((prev) => prev + 1);

            dispatch(createEmptyRecord({ row: newRow, service_id: selectedListItem.itemID }));
        }
    };

    // When the delete button is clicked, it will delete the selected rows in the table
    const handleOnDeleteButtonClick = () => {
        if (gridApi) {
            const selectedRows = gridApi.getSelectedRows();
            if (selectedRows.length > 0) {
                const { itemID } = selectedListItem;
                const newRecords = rows.filter((row) => !selectedRows.includes(row));
                dispatch(deleteRecords({ records: newRecords, service_id: itemID }));
                gridApi.applyTransaction({ remove: selectedRows });
            }
        }
    };

    // When the modal is closed, it will reset everything and close the modal
    const handleOnCloseButtonClick = () => {
        resetEverything();
        if (onClose) onClose();
    };

    //#endregion

    //#region Grid Utilities
    const resetEverything = () => {
        resetSelection();
        dispatch(clearRecords());
    };

    const resetSelection = () => {
        if (gridApi) gridApi.deselectAll();
    };

    // Save Updated Cell Value
    const saveNewValue = (params) => {
        const field = params.column.colId;
        const row = { ...params.data, [field]: params.newValue };
        dispatch(updateRecord({ field, itemID: selectedListItem.itemID, row }));
        return true;
    };

    // Save Data to Redux
    const saveData = (id) => {
        const tableData = GetRowData(gridApi);
        if (tableData.length > 0) {
            dispatch(addRecords({ serviceId: id, newRecords: tableData }));
        }
    };

    // Set Table Data for Selected Service
    const setTableData = (itemID) => {
        const newData = records[itemID] || [];
        setRows(newData);
    };
    //#endregion

    return (
        <Modal
            open={open}
            onClose={handleOnCloseButtonClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ComponentStyles.modal.main}>
                {/* Add Row and Delete Buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <PanelButton label="Add Row +" onClick={handleOnAddRowButtonClick} disabled={!selectedListItem} />
                    <PanelButton
                        label="Delete"
                        color="error"
                        onClick={handleOnDeleteButtonClick}
                        disabled={!selectedListItem}
                    />
                </Box>

                {/* Modal Content */}
                <Box sx={ComponentStyles.modal.content}>
                    {/* The List to contain all the services in the database */}
                    <ServiceList onListItemClick={handleOnListItemClicked} selectedItem={selectedListItem || null} />

                    {/* The table that allows the user to create addons */}
                    <DGTable
                        ref={tableRef}
                        rows={rows}
                        cols={AddonSchema.modal}
                        defaultColDef={{
                            valueSetter: saveNewValue,
                            sortable: false,
                        }}
                        singleClickEdit={true}
                        sx={ModalStyles.table}
                        rowSelection={rowSelectionConfig}
                        stopEditingWhenCellsLoseFocus={true}
                        onGridReady={onGridReady}
                        onCellEditingStopped={onCellEditingStopped}
                    />
                </Box>

                {/* Saving and Modal close buttons */}
                <Stack direction="row" sx={ModalStyles.btnStack}>
                    <PanelButton label="Save Changes" onClick={handleOnSaveButtonClick} />
                    <PanelButton label="Close" onClick={handleOnCloseButtonClick} />
                </Stack>
            </Box>
        </Modal>
    );
}

// Modal Styles
const ModalStyles = {
    btnStack: {
        justifyContent: 'flex-end',
        gap: 1,
    },
};
