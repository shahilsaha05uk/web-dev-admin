import { useRef } from 'react';
import { Box, Modal, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DGTable from 'core_components/tables/DGTable';
import PanelButton from 'core_components/buttons/PanelButton';
import AddServiceForm from 'services/components/AddServiceForm';
import { ComponentStyles } from 'assets/compStyles';
import { setRecords, setRowToEdit } from 'services/states/slc_serviceModal';
import { ServiceSchema } from 'services/schema/service_schema';
import usePostServiceDetails from 'services/hooks/usePostServiceDetails';
import { incrementCount } from '../states/slc_serviceModal';
import { AddRow, DeleteSelectedRow, UpdateSelectedRow, GetAPIFromTableRef, GetRowData } from 'helper/table_helper';
import { useCallback } from 'react';

export default function AddServiceModal({ open, onClose }) {
    //#region  Properties
    // This stores all the data in the table
    const tableRef = useRef(null);
    const getRowId = useCallback((params) => String(params.data.table_id), []);

    const records = useSelector((state) => state.addServiceModal.records);
    const count = useSelector((state) => state.addServiceModal.recordCount);
    const rowSelectionConfig = useSelector((state) => state.addServiceModal.rowSelectionConfig);
    const rowToEdit = useSelector((state) => state.addServiceModal.rowToEdit);

    const dispatch = useDispatch();

    const { mutate } = usePostServiceDetails();
    //#endregion Properties

    //#region  Button Handlers
    const handleOnAddButtonClick = (record) => {
        dispatch(incrementCount());
        record.table_id = count;
        AddRow(tableRef, record);
    };

    const handleOnDeleteButtonClick = () => {
        DeleteSelectedRow(tableRef);
        resetSelection();
    };

    const handleOnUpdateButtonClick = (data) => {
        UpdateSelectedRow(tableRef, data);
        resetSelection();
    };

    const handleOnCancelUpdateButtonClick = () => {
        resetSelection();
    };

    const handleOnSaveButtonClick = () => {
        const data = GetRowData(tableRef);
        mutate(data);

        resetEverything();
        if (onClose) onClose();
    };

    const handleOnCloseButtonClick = () => {
        resetEverything();
        if (onClose) onClose();
    };
    //#endregion Button Handlers

    //#region Event Handlers
    const handleOnRowClicked = (event) => {
        const { rowIndex, data } = event;

        if (!rowToEdit) {
            dispatch(setRowToEdit({ rowIndex, data }));
        } else {
            if (rowToEdit.rowIndex === rowIndex) {
                resetSelection();
            } else {
                dispatch(setRowToEdit({ rowIndex, data }));
            }
        }
    };
    //#endregion Event Handlers

    //#region  Utilities
    const resetEverything = () => {
        resetSelection();
        dispatch(setRecords([]));
    };

    const resetSelection = () => {
        dispatch(setRowToEdit(null));

        const gridApi = GetAPIFromTableRef(tableRef);
        if (gridApi) {
            gridApi.deselectAll();
        }
    };
    //#endregion Utilities

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ComponentStyles.modal.main}>
                {/* The content of the modal */}
                <Box sx={ComponentStyles.modal.content}>
                    {/* The table component */}
                    <DGTable
                        ref={tableRef}
                        cols={ServiceSchema.modal}
                        rows={records}
                        getRowId={getRowId}
                        rowSelection={rowSelectionConfig}
                        onRowClicked={handleOnRowClicked}
                    />
                    {/* The form to handle all the fields in the form */}
                    <AddServiceForm
                        onAdd={handleOnAddButtonClick}
                        onSave={handleOnSaveButtonClick}
                        onCancel={handleOnCancelUpdateButtonClick}
                        onUpdate={handleOnUpdateButtonClick}
                        onDelete={handleOnDeleteButtonClick}
                        rowToEdit={rowToEdit}
                    />
                </Box>

                {/* Stack to hold the Save button and the Cancel Button */}
                <Stack direction="row" sx={ModalStyles.btnStack}>
                    <PanelButton label="Save Changes" onClick={handleOnSaveButtonClick} />
                    <PanelButton label="Close" onClick={handleOnCloseButtonClick} />
                </Stack>
            </Box>
        </Modal>
    );
}

const ModalStyles = {
    btnStack: {
        justifyContent: 'flex-end',
        gap: 1,
    },
};
