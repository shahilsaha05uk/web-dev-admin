import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';

// Core components
import BasePanel from 'core_components/panels/BasePanel';
import PanelButton from 'core_components/buttons/PanelButton';
import { ComponentStyles } from 'assets/compStyles';
import DGTable from 'core_components/tables/DGTable';
import LoadingRadial from 'core_components/misc/LoadingRadial';
import ErrorScreen from 'core_components/misc/ErrorScreen';

// Helper Classes
import { GetIDsFromSelectedRows, GetSelectedRowsFromTableRef } from 'helper/table_helper';

// Addon Components
import { setRecords, setRowSelectionConfig, setSelectedRowCount } from 'addon/states/slc_addons';
import { AddonSchema } from 'addon/schema/addon_schema';
import AddAddonModal from 'addon/components/AddAddonModal';

// API calls
import { useFetchAllAddons } from 'api/fetch/useFetchAllAddons';
import UpdateAddonModal from './components/UpdateAddonModal';
import useDeleteAddonDetails from 'modules/addon/hooks/useDeleteAddonDetails';

export default function Addon() {
    const rowSelectionConfig = useSelector((state) => state.addon.rowSelectionConfig);
    const records = useSelector((state) => state.addon.records);
    const selectedRowCount = useSelector((state) => state.addon.selectedRowCount);
    const dispatch = useDispatch();

    const tableRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
    const [currentModal, setCurrentModal] = useState(null);
    const { data, isLoading, isError, error } = useFetchAllAddons();
    const { mutate } = useDeleteAddonDetails();

    const handleOnMultiSelectButtonClick = () => {
        resetSelection();
        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: 'multiRow',
            }),
        );
    };

    const handleOnCancelMultiSelectButtonClick = () => {
        resetSelection();

        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: 'singleRow',
            }),
        );
    };

    const handleOnDeleteButtonClick = () => {
        if (gridApi) {
            const ids = GetIDsFromSelectedRows(gridApi, 'addon_id');
            console.log('Deleting IDs:', ids);
            mutate(ids);
            resetEverything();
        }
    };

    const resetEverything = () => {
        resetSelection();

        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: 'singleRow',
            }),
        );
    };

    const resetSelection = () => {
        dispatch(setSelectedRowCount(0));

        if (gridApi) {
            gridApi.deselectAll();
        }
    };
    const handleOnModalClose = () => {
        setCurrentModal(null);
    };

    const handleOnRowClicked = () => {
        if (gridApi) {
            const count = gridApi.getSelectedRows().length;
            dispatch(setSelectedRowCount(count));
        }

        console.log('Selection count:', selectedRowCount);
    };

    const handleOnGridReady = (params) => {
        setGridApi(params.api);
    };

    useEffect(() => {
        dispatch(setRecords(data));
    }, [data, dispatch]);

    if (isLoading) return <LoadingRadial />;
    if (isError) return <ErrorScreen error={error} />;

    return (
        <BasePanel>
            <div>
                <h1>Addons</h1>
                {/* Buttons to open modals */}
                <PanelButton label="Add" onClick={() => setCurrentModal('add')} sx={ComponentStyles.panelButton} />
                <PanelButton
                    label="Update"
                    onClick={() => setCurrentModal('update')}
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
                        cols={AddonSchema.main}
                        rows={records}
                        pagination
                        paginationPageSizeSelector={[10, 20, 30, 100]}
                        paginationPageSize={10}
                        rowSelection={rowSelectionConfig}
                        onGridReady={handleOnGridReady}
                        onRowClicked={handleOnRowClicked}
                        onRowSelected={handleOnRowClicked}
                    />
                </Box>

                {/* Modals */}
                {currentModal === 'add' && <AddAddonModal open onClose={() => handleOnModalClose()} />}
                {currentModal === 'update' && (
                    <UpdateAddonModal
                        open
                        onClose={() => handleOnModalClose()}
                        row={GetSelectedRowsFromTableRef(tableRef)}
                    />
                )}
            </div>
        </BasePanel>
    );
}
