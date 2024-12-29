import React, { useEffect } from 'react';
import BasePanel from 'core_components/panels/BasePanel';
import PanelButton from 'core_components/buttons/PanelButton';
import { ComponentStyles } from 'assets/compStyles';
import { useFetchAllServices } from 'api/fetch/useFetchAllServices';
import { useState } from 'react';
import { Box } from '@mui/material';
import DGTable from 'core_components/tables/DGTable';
import LoadingRadial from 'core_components/misc/LoadingRadial';
import ErrorScreen from 'core_components/misc/ErrorScreen';
import { useRef } from 'react';
import { DeleteSelectedRow, GetAPIFromTableRef, GetSelectedRowsFromTableRef, RefreshTable } from 'helper/table_helper';
import { useDispatch, useSelector } from 'react-redux';
import { setRowSelectionConfig, setSelectedRowCount } from 'services/states/slc_services';
import { ServiceSchema } from 'services/schema/service_schema';
import AddServiceModal from 'services/components/AddServiceModal';
import { AddRows } from 'helper/table_helper';
import useDeleteServiceDetails from './hooks/useDeleteServiceDetails';
import { GetPermanentIDsFromSelectedRows } from './utils/serviceHelper';
import UpdateServiceModal from './components/UpdateServiceModal';

export default function Services() {
    const rowSelectionConfig = useSelector((state) => state.service.rowSelectionConfig);
    const records = useSelector((state) => state.service.records);
    const selectedRowCount = useSelector((state) => state.service.selectedRowCount);
    const dispatch = useDispatch();

    const tableRef = useRef(null);
    const [currentModal, setCurrentModal] = useState(null);
    const [gridApi, setGridApi] = useState(null);
    const { data, isLoading, isError, error } = useFetchAllServices();
    const { mutate } = useDeleteServiceDetails();

    // When the multi-select button is clicked, it will enable the multi-row selection mode
    const handleOnMultiSelectButtonClick = () => {
        resetSelection();
        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: 'multiRow',
            }),
        );
    };

    // When the cancel multi-select button is clicked, it will reset the selection to single-row mode
    const handleOnCancelMultiSelectButtonClick = () => {
        resetSelection();

        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: 'singleRow',
            }),
        );
    };

    // When the delete button is clicked, it will delete the selected rows
    const handleOnDeleteButtonClick = () => {
        const ids = GetPermanentIDsFromSelectedRows(gridApi);
        DeleteSelectedRow(tableRef);

        if (ids.length > 0) {
            console.log('Deleting rows with IDs:', ids);
            mutate(ids); // Pass only IDs to the delete mutation
            resetSelection(); // Clear selection after deletion
        }
    };

    // Reset the selection count to 0
    const resetSelection = () => {
        dispatch(setSelectedRowCount(0));

        if (gridApi) {
            gridApi.deselectAll();
        }
    };

    const handleOnModalClose = () => {
        setCurrentModal(null);
        resetSelection();
    };

    const handleOnRowClicked = () => {
        if (gridApi) {
            const count = gridApi.getSelectedRows().length;
            dispatch(setSelectedRowCount(count));
        }
    };

    const handleOnGridReady = (params) => {
        AddRows(tableRef, data);
        setGridApi(params.api);
    };

    const handleOnModalOpen = (modal) => {
        dispatch(setRowSelectionConfig({ ...rowSelectionConfig, mode: 'singleRow' }));
        setCurrentModal(modal);
    };

    const getSelectedRows = () => {
        if (gridApi) {
            const selectedRows = gridApi.getSelectedRows();
            console.log('Selected Rows:', selectedRows);
            return selectedRows;
        }
    };

    useEffect(() => {
        if (data && tableRef) {
            RefreshTable(tableRef, data);
        }
    }, [data, tableRef]);

    if (isLoading) return <LoadingRadial />;
    if (isError) return <ErrorScreen error={error} />;

    return (
        <BasePanel>
            <div>
                <h1>Services</h1>
                {/* Buttons to open modals */}
                <PanelButton label="Add" onClick={() => handleOnModalOpen('add')} sx={ComponentStyles.panelButton} />
                <PanelButton
                    label="Update"
                    onClick={() => handleOnModalOpen('update')}
                    sx={ComponentStyles.panelButton}
                    disabled={selectedRowCount !== 1}
                />
                <PanelButton
                    label="Multi-Select"
                    onClick={handleOnMultiSelectButtonClick}
                    sx={ComponentStyles.panelButton}
                    disabled={rowSelectionConfig.mode === 'multiRow'}
                />
                <PanelButton
                    label="Cancel Multi-Select"
                    onClick={handleOnCancelMultiSelectButtonClick}
                    sx={ComponentStyles.panelButton}
                    disabled={rowSelectionConfig.mode === 'singleRow'}
                />
                <PanelButton
                    label="Delete"
                    onClick={handleOnDeleteButtonClick}
                    sx={ComponentStyles.panelButton}
                    disabled={selectedRowCount <= 0}
                />

                {/* Main Table */}
                <Box sx={ComponentStyles.pageTable}>
                    <DGTable
                        ref={tableRef}
                        cols={ServiceSchema.main}
                        rows={records}
                        pagination
                        paginationPageSizeSelector={[10, 20, 30, 100]}
                        paginationPageSize={10}
                        onGridReady={handleOnGridReady}
                        rowSelection={rowSelectionConfig}
                        onRowClicked={handleOnRowClicked}
                        onRowSelected={handleOnRowClicked}
                    />
                </Box>

                {/* Modals */}
                {currentModal === 'add' && <AddServiceModal open onClose={() => handleOnModalClose()} />}
                {currentModal === 'update' && (
                    <UpdateServiceModal open onClose={() => handleOnModalClose()} row={getSelectedRows()} />
                )}
            </div>
        </BasePanel>
    );
}
