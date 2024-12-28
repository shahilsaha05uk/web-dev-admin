import { Box, Modal, Stack } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import PanelButton from 'core_components/buttons/PanelButton';
import { useRef } from 'react';
import DGTable from 'core_components/tables/DGTable';
import { useDispatch, useSelector } from 'react-redux';
import { setRecords } from 'addon/states/slc_addons';
import { AddRow, GetAPIFromTableRef } from 'helper/table_helper';
import usePostServiceDetails from 'modules/services/hooks/usePostServiceDetails';
import { AddonSchema } from 'addon/schema/addon_schema';
import { useCallback } from 'react';

import ServiceList from './ServiceList';

export default function AddAddonModal({ open, onClose }) {
    // This stores all the data in the table
    const tableRef = useRef(null);

    const records = useSelector((state) => state.addonModal.records);
    const rowSelectionConfig = useSelector((state) => state.addonModal.rowSelectionConfig);
    const rowToEdit = useSelector((state) => state.addonModal.rowToEdit);

    const dispatch = useDispatch();

    // const { mutate } = usePostServiceDetails();
    // const { data } = useFetchAllServiceIDs();

    const onAddButtonClick = (record) => {
        dispatch(setRecords([record, ...records]));
    };

    const onDeleteButtonClick = () => {
        const newRecords = records.filter((record) => record.id !== rowToEdit.data.id);
        dispatch(setRecords(newRecords));
        resetSelection();
    };

    const onUpdateButtonClick = (data) => {
        console.log(data);
        // This is where the data needs to be updated in the table
        const gridApi = tableRef.current?.api;
        if (gridApi) {
            const rowNode = gridApi.getRowNode(rowToEdit.rowIndex);

            if (rowNode) {
                rowNode.setData(data);
            }
        }

        resetSelection();
    };

    const onCancelUpdateButtonClick = () => {
        resetSelection();
        //if (onClose) onClose();
    };

    const onSaveButtonClick = () => {
        mutate(records);

        resetEverything();
        if (onClose) onClose();
    };

    const handleOnClose = () => {
        resetEverything();
        if (onClose) onClose();
    };

    const handleOnRowClicked = (event) => {
        // const { rowIndex, data } = event;
        // if (!rowToEdit) {
        //     dispatch(setRowToEdit({ rowIndex, data }));
        // } else {
        //     if (rowToEdit.rowIndex === rowIndex) {
        //         resetSelection();
        //     } else {
        //         dispatch(setRowToEdit({ rowIndex, data }));
        //     }
        // }

        const gridApi = GetAPIFromTableRef(tableRef);

        const fCell = gridApi.getFocusedCell();
        if (fCell) {
            console.log(fCell);
        } else {
            console.log('NO Cell is focussed');
        }

        if (gridApi) {
            gridApi.clearFocusedCell();
        }
    };

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

    const onAddRow = () => {
        // This is where the data needs to be updated in the table
        AddRow(tableRef, []);
    };

    const onCellEditingStarted = useCallback((event) => {
        console.log('cellEditingStarted');
        const gridApi = GetAPIFromTableRef(tableRef);

        const fCell = gridApi.getFocusedCell();
        if (fCell) {
            console.log(fCell);
        } else {
            console.log('NO Cell is focussed');
        }

        if (gridApi) {
            gridApi.clearFocusedCell();
        }
    }, []);

    const onCellEditingStopped = useCallback((event) => {
        console.log('cellEditingStopped');

        console.log('cellEditingStarted');
        const gridApi = GetAPIFromTableRef(tableRef);

        if (gridApi) {
            gridApi.clearFocusedCell();
        }
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ComponentStyles.modal.main}>
                <PanelButton label="Add Row +" onClick={onAddRow} />
                {/* The content of the modal */}
                <Box sx={ComponentStyles.modal.content}>
                    <ServiceList />
                    {/* The table component */}
                    <DGTable
                        sx={ModalStyles.table}
                        ref={tableRef}
                        cols={AddonSchema.modal}
                        rows={records}
                        stopEditingWhenCellsLoseFocus={true}
                        singleClickEdit={true}
                        rowSelection={rowSelectionConfig}
                        onRowClicked={handleOnRowClicked}
                        onCellEditingStarted={onCellEditingStarted}
                        onCellEditingStopped={onCellEditingStopped}
                    />
                </Box>

                {/* Stack to hold the Save button and the Cancel Button */}
                <Stack direction="row" sx={ModalStyles.btnStack}>
                    <PanelButton label="Save Changes" onClick={onSaveButtonClick} />
                    <PanelButton label="Close" onClick={handleOnClose} />
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
