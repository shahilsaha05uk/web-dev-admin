import React, { useEffect } from "react";
import BasePanel from "./BasePanel";
import PanelButton from "../PanelButton";
import { ComponentStyles } from "../../assets/compStyles";
import { useFetchAllServices } from "../../utils/externalUtils/fetchers/useFetchAllServices";
import { useState } from "react";
import AddModal from "../modals/AddModal";
import { Box } from "@mui/material";
import DGTable from "../tables/DGTable";
import LoadingRadial from "../misc/LoadingRadial";
import ErrorScreen from "../misc/ErrorScreen";
import UpdateModal from "../modals/UpdateModal";
import { useRef } from "react";
import {
	GetAPIFromTableRef,
	GetSelectedRowsFromTableRef,
} from "../../utils/tableUtils";
import { useDispatch, useSelector } from "react-redux";
import {
	setRecords,
	setRowSelectionConfig,
	setSelectedRowCount,
} from "../../states/slc_restaurant";
import useDeleteRestaurantDetails from "../../utils/externalUtils/posters/useDeleteRestaurantDetails";
import { ServiceSchema } from "../../utils/consts/schema/service_schema";

export default function Services() {
	const records = useSelector((state) => state.restaurant.records);
	const rowSelectionConfig = useSelector(
		(state) => state.restaurant.rowSelectionConfig
	);
	const selectedRowCount = useSelector(
		(state) => state.restaurant.selectedRowCount
	);
	const dispatch = useDispatch();

	const tableRef = useRef(null);
	const [currentModal, setCurrentModal] = useState(null);
	const { data, isLoading, isError, error } = useFetchAllServices();
	const { mutate } = useDeleteRestaurantDetails();

	const handleOnMultiSelectButtonClick = () => {
		resetSelection();
		dispatch(
			setRowSelectionConfig({
				...rowSelectionConfig,
				mode: "multiRow",
			})
		);
	};

	const handleOnCancelMultiSelectButtonClick = () => {
		resetSelection();

		dispatch(
			setRowSelectionConfig({
				...rowSelectionConfig,
				mode: "singleRow",
			})
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
		dispatch(setRowSelectionConfig(rowsSelectionData));
		dispatch(setRecords(data));
	}, [data, rowsSelectionData, dispatch]);

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
						cols={ServiceSchema}
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
					<AddModal open onClose={() => handleOnModalClose()} />
				)}
				{currentModal === "update" && (
					<UpdateModal
						open
						onClose={() => handleOnModalClose()}
						row={GetSelectedRowsFromTableRef(tableRef)}
					/>
				)}
			</div>
		</BasePanel>
	);
}

const rowsSelectionData = {
	mode: "singleRow",
	enableClickSelection: true,
	enableSelectionWithoutKeys: true,
	checkboxes: true,
	headerCheckbox: false,
};
