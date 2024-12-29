import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import DGTable from 'core_components/tables/DGTable';
import BasePanel from 'core_components/panels/BasePanel';
import ErrorScreen from 'core_components/misc/ErrorScreen';
import PanelButton from 'core_components/buttons/PanelButton';
import LoadingRadial from 'core_components/misc/LoadingRadial';

import { AddRows, DeleteSelectedRow, GetIDsFromSelectedRows, RefreshTable } from 'helper/table_helper';

import { ComponentStyles } from 'assets/compStyles';

import { setRowSelectionConfig, setSelectedRowCount } from 'services/states/slc_services';
import { ServiceSchema } from 'services/schema/service_schema';
import AddServiceModal from 'services/components/AddServiceModal';

import { useFetchAllServices } from 'api/fetch/useFetchAllServices';

import useDeleteServiceDetails from './hooks/useDeleteServiceDetails';
import UpdateServiceModal from './components/UpdateServiceModal';

export default function Services() {
    //#region  Properties

    // Redux selectors
    const rowSelectionConfig = useSelector((state) => state.service.rowSelectionConfig);
    const records = useSelector((state) => state.service.records);
    const selectedRowCount = useSelector((state) => state.service.selectedRowCount);
    const dispatch = useDispatch();

    // States and refs
    const [currentModal, setCurrentModal] = useState(null);
    const [gridApi, setGridApi] = useState(null);
    const { data, isLoading, isError, error } = useFetchAllServices();
    const { mutate } = useDeleteServiceDetails();
    //#endregion Properties

    useEffect(() => {
        if (data && gridApi) {
            RefreshTable(gridApi, data);
        }
    }, [data, gridApi]);

    //#region  Button Handlers
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
        const ids = GetIDsFromSelectedRows(gridApi, 'service_id');
        DeleteSelectedRow(gridApi);

        if (ids.length > 0) {
            console.log('Deleting rows with IDs:', ids);
            mutate(ids); // Pass only IDs to the delete mutation
            resetSelection(); // Clear selection after deletion
        }
    };
    //#endregion Button Handlers

    //#region  Event Handlers

    // Modal Handlers
    const handleOnModalClose = () => {
        setCurrentModal(null);
        resetSelection();
    };

    const handleOnModalOpen = (modal) => {
        dispatch(setRowSelectionConfig({ ...rowSelectionConfig, mode: 'singleRow' }));
        setCurrentModal(modal);
    };

    // Grid Handlers
    const handleOnRowClicked = () => {
        if (gridApi) {
            const count = gridApi.getSelectedRows().length;
            dispatch(setSelectedRowCount(count));
        }
    };

    const handleOnGridReady = (params) => {
        AddRows(gridApi, data);
        setGridApi(params.api);
    };
    //#endregion Event Handlers

    //#region  Utilities
    const getSelectedRows = () => {
        if (gridApi) {
            const selectedRows = gridApi.getSelectedRows();
            console.log('Selected Rows:', selectedRows);
            return selectedRows;
        }
    };

    // Reset the selection count to 0
    const resetSelection = () => {
        dispatch(setSelectedRowCount(0));

        if (gridApi) {
            gridApi.deselectAll();
        }
    };
    //#endregion Utilities

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
