import { Box, Modal, Stack } from "@mui/material";
import { ComponentStyles } from "../../assets/compStyles";
import AddForm from "../forms/AddForm";
import PanelButton from "../PanelButton";
import { useRef, useState } from "react";
import DGTable from "../tables/DGTable";
import { TableData } from "../../utils/consts/tableConsts";
import usePostRestaurantDetails from "../../utils/externalUtils/posters/usePostRestaurantDetails";
import { memoizeRowSelection } from "../../utils/memos/table/memoizeRowSelection";
import { useDataMemo } from "../../utils/memos/table/useDataMemo";
import { FormProvider, useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function AddModal({ open, onClose }) {
	// This stores all the data in the table
	const methods = useForm();
	const [data, setData] = useState([]);
	const [editRow, setEditRow] = useState(null);
	const tableRef = useRef(null);
	const { mutate } = usePostRestaurantDetails();

	// Cache the data and row selection
	const dataMemo = useDataMemo(data);
	const rowSelectionMemo = memoizeRowSelection(rowsSelectionData);

	const onAdd = (record) => {
		record.id = nanoid();
		setData([record, ...data]);
	};

	const onSave = () => {
		mutate(data);
		setData([]);
		onClose();
	};
	const onUpdate = (data) => {
		console.log(data);
		// This is where the data needs to be updated in the table
		const gridApi = tableRef.current?.api;
		if (gridApi) {
			const rowNode = gridApi.getRowNode(editRow.rowIndex);

			if (rowNode) {
				rowNode.setData(data);
			}
		}
	};

	const onCancel = () => {
		setEditRowData(null);
	};

	const handleOnRowClicked = (event) => {
		setEditRow(event);
	};

	const handleOnSelectionChanged = (event) => {
		const gridApi = tableRef.current?.api;
		if (gridApi) {
			const selectedRows = gridApi.getSelectedRows().length;
			if (selectedRows <= 0) {
				setEditRow(null);
				gridApi.deselectAll();
			}
		}
	};

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
						cols={TableData.modalRestaurantTable}
						rows={dataMemo}
						rowSelection={rowSelectionMemo}
						onRowSelected={handleOnRowClicked}
						onSelectionChanged={handleOnSelectionChanged}
					/>
					{/* The form to handle all the fields in the form */}
					<FormProvider {...methods}>
						<AddForm
							onAdd={onAdd}
							onSave={onSave}
							onCancel={onCancel}
							onUpdate={onUpdate}
							editRow={editRow}
						/>
					</FormProvider>
				</Box>

				{/* Stack to hold the Save button and the Cancel Button */}
				<Stack direction="row" sx={ModalStyles.btnStack}>
					<PanelButton label="Save Changes" onClick={onSave} />
					<PanelButton label="Cancel" onClick={onClose} />
				</Stack>
			</Box>
		</Modal>
	);
}

const ModalStyles = {
	btnStack: {
		justifyContent: "flex-end",
		gap: 1,
	},
};

const rowsSelectionData = {
	mode: "singleRow",
	enableClickSelection: true,
	checkboxes: true,
};
