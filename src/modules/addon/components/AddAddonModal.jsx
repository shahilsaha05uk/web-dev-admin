import { Box, Modal, Stack } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import PanelButton from 'core_components/buttons/PanelButton';
import DGTable from 'core_components/tables/DGTable';
import ServiceList from './ServiceList';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecords, addRecords, createEmptyRecord, updateRecord } from 'addon/states/slc_addonModal';
import { DeleteSelectedRow, GetRowData } from 'helper/table_helper';
import usePostServiceDetails from 'modules/services/hooks/usePostServiceDetails';
import { AddonSchema } from 'addon/schema/addon_schema';
import { isTheSameIndex } from '../utils/addon_helper';
import { clearRecords, deleteRecords } from '../states/slc_addonModal';
import usePostAddonDetails from '../hooks/usePostAddonDetails';

export default function AddAddonModal({ open, onClose }) {
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

    // On Grid Ready Callback
    const onGridReady = (params) => setGridApi(params.api);

    // Sync Redux Records with Table Rows
    useEffect(() => {
        if (selectedListItem && records[selectedListItem.itemID]) {
            setRows(records[selectedListItem.itemID]);
        }

        console.log('Records:', records);
    }, [records, selectedListItem]);

    // Save Data to Redux
    const saveData = (id) => {
        const tableData = GetRowData(tableRef);
        if (tableData.length > 0) {
            dispatch(addRecords({ serviceId: id, newRecords: tableData }));
        }
    };

    // Set Table Data for Selected Service
    const setTableData = (itemID) => {
        const newData = records[itemID] || [];
        setRows(newData);
    };

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

    // Add Empty Row
    const addEmptyRow = () => {
        if (gridApi && selectedListItem) {
            const newRow = { table_id: tableCount };
            gridApi.applyTransaction({ add: [newRow] });
            setTableCount((prev) => prev + 1);

            dispatch(createEmptyRecord({ row: newRow, service_id: selectedListItem.itemID }));
        }
    };

    const deleteRows = () => {
        if (gridApi) {
            const selectedRows = gridApi.getSelectedRows();
            if (selectedRows.length > 0) {
                const { itemID } = selectedListItem;
                console.log('itemID', itemID);
                const newRecords = rows.filter((row) => !selectedRows.includes(row));
                dispatch(deleteRecords({ records: newRecords, service_id: itemID }));
                gridApi.applyTransaction({ remove: selectedRows });
            }
        }
    };

    // Save Updated Cell Value
    const saveNewValue = (params) => {
        const field = params.column.colId;
        const row = { ...params.data, [field]: params.newValue };
        dispatch(updateRecord({ field, itemID: selectedListItem.itemID, row }));
        return true;
    };

    // On Cell Editing Stopped
    const onCellEditingStopped = useCallback(() => {
        if (gridApi) gridApi.clearFocusedCell();
    }, [gridApi]);

    // Reset Everything
    const resetEverything = () => {
        resetSelection();
        dispatch(clearRecords());
    };

    const resetSelection = () => {
        if (gridApi) gridApi.deselectAll();
    };

    // Handle Modal Close
    const handleOnClose = () => {
        resetEverything();
        if (onClose) onClose();
    };

    // Handle Save Button Click
    const handleSave = () => {
        mutate(records);
        resetEverything();
        if (onClose) onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleOnClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ComponentStyles.modal.main}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <PanelButton label="Add Row +" onClick={addEmptyRow} disabled={!selectedListItem} />
                    <PanelButton label="Delete" color="error" onClick={deleteRows} disabled={!selectedListItem} />
                </Box>
                <Box sx={ComponentStyles.modal.content}>
                    <ServiceList onListItemClick={handleOnListItemClicked} selectedItem={selectedListItem || null} />
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
                <Stack direction="row" sx={ModalStyles.btnStack}>
                    <PanelButton label="Save Changes" onClick={handleSave} />
                    <PanelButton label="Close" onClick={handleOnClose} />
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
