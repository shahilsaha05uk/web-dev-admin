import React, { useEffect } from "react";
import BasePanel from "core_components/panels/BasePanel";
import PanelButton from "core_components/buttons/PanelButton";
import { ComponentStyles } from "assets/compStyles";
import { useFetchAllServices } from "api/fetch/useFetchAllServices";
import { useState } from "react";
import { Box } from "@mui/material";
import DGTable from "core_components/tables/DGTable";
import LoadingRadial from "core_components/misc/LoadingRadial";
import ErrorScreen from "core_components/misc/ErrorScreen";
import { useRef } from "react";
import {
    GetAPIFromTableRef,
    GetSelectedRowsFromTableRef,
} from "helper/table_helper";
import { useDispatch, useSelector } from "react-redux";
import {
    setRecords,
    setRowSelectionConfig,
    setSelectedRowCount,
} from "services/states/slc_services";
import { ServiceSchema } from "services/schema/service_schema";
import useDeleteServiceDetails from "api/post/useDeleteServiceDetails";
import AddServiceModal from "services/components/AddServiceModal";

export default function Services() {
    const rowSelectionConfig = useSelector(
        (state) => state.service.rowSelectionConfig,
    );
    const records = useSelector((state) => state.service.records);
    const selectedRowCount = useSelector(
        (state) => state.service.selectedRowCount,
    );
    const dispatch = useDispatch();

    const tableRef = useRef(null);
    const [currentModal, setCurrentModal] = useState(null);
    const { data, isLoading, isError, error } = useFetchAllServices();
    const { mutate } = useDeleteServiceDetails();

    const handleOnMultiSelectButtonClick = () => {
        resetSelection();
        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: "multiRow",
            }),
        );
    };

    const handleOnCancelMultiSelectButtonClick = () => {
        resetSelection();

        dispatch(
            setRowSelectionConfig({
                ...rowSelectionConfig,
                mode: "singleRow",
            }),
        );
    };

    const handleOnDeleteButtonClick = () => {
        const selectedRows = GetSelectedRowsFromTableRef(tableRef);
        if (selectedRows && selectedRows.length > 0) {
            const ids = selectedRows.map((row) => row.id);
            console.log("Deleting rows with IDs:", ids);

            mutate(ids); // Pass only IDs to the delete mutation
            resetSelection(); // Clear selection after deletion
        }
    };

    const resetSelection = () => {
        dispatch(setSelectedRowCount(0));

        const gridApi = GetAPIFromTableRef(tableRef);
        if (gridApi) {
            gridApi.deselectAll();
        }

        console.log("Selection count:", selectedRowCount);
    };

    const handleOnModalClose = () => {
        setCurrentModal(null);
    };

    const handleOnRowClicked = () => {
        const gridApi = GetAPIFromTableRef(tableRef);

        if (gridApi) {
            const count = gridApi.getSelectedRows().length;
            dispatch(setSelectedRowCount(count));
        }

        console.log("Selection count:", selectedRowCount);
    };

    useEffect(() => {
        dispatch(setRecords(data));
    }, [data, dispatch]);

    if (isLoading) return <LoadingRadial />;
    if (isError) return <ErrorScreen error={error} />;

    return (
        <BasePanel>
            <div>
                <h1>Services</h1>
                {/* Buttons to open modals */}
                <PanelButton
                    label="Add"
                    onClick={() => setCurrentModal("add")}
                    sx={ComponentStyles.panelButton}
                />
                <PanelButton
                    label="Update"
                    onClick={() => setCurrentModal("update")}
                    sx={ComponentStyles.panelButton}
                    disabled={selectedRowCount !== 1}
                />
                <PanelButton
                    label="Multi-Select"
                    onClick={handleOnMultiSelectButtonClick}
                    sx={ComponentStyles.panelButton}
                    disabled={rowSelectionConfig.mode === "multiRow"}
                />
                <PanelButton
                    label="Cancel Multi-Select"
                    onClick={handleOnCancelMultiSelectButtonClick}
                    sx={ComponentStyles.panelButton}
                    disabled={rowSelectionConfig.mode === "singleRow"}
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
                        rowSelection={rowSelectionConfig}
                        onRowClicked={handleOnRowClicked}
                        onRowSelected={handleOnRowClicked}
                    />
                </Box>

                {/* Modals */}
                {currentModal === "add" && (
                    <AddServiceModal
                        open
                        onClose={() => handleOnModalClose()}
                    />
                )}
                {currentModal === "update" &&
                    {
                        /* <UpdateModal
                        open
                        onClose={() => handleOnModalClose()}
                        row={GetSelectedRowsFromTableRef(tableRef)}
                    /> */
                    }}
            </div>
        </BasePanel>
    );
}
