import { useRef } from "react";
import { Box, Modal, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DGTable from "../tables/DGTable";
import PanelButton from "../PanelButton";
import AddServiceForm from "../forms/AddServiceForm";
import { ComponentStyles } from "../../assets/compStyles";
import { GetAPIFromTableRef } from "../../utils/tableUtils";
import { setRecords, setRowToEdit } from "../../states/slc_serviceModal";
import { ServiceSchema } from "../../utils/consts/schema/service_schema";
import usePostServiceDetails from "../../utils/externalUtils/posters/usePostServiceDetails";

export default function AddServiceModal({ open, onClose }) {
	// This stores all the data in the table
	const tableRef = useRef(null);

	const records = useSelector((state) => state.addServiceModal.records);
	const rowSelectionConfig = useSelector(
		(state) => state.addServiceModal.rowSelectionConfig
	);
	const rowToEdit = useSelector((state) => state.addServiceModal.rowToEdit);

	const dispatch = useDispatch();

	const { mutate } = usePostServiceDetails();

	const onAddButtonClick = (record) => {
		dispatch(setRecords([record, ...records]));
	};

	const onDeleteButtonClick = () => {
		const newRecords = records.filter(
			(record) => record.id !== rowToEdit.data.id
		);
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
						rowSelection={rowSelectionConfig}
						onRowClicked={handleOnRowClicked}
					/>
					{/* The form to handle all the fields in the form */}
					<AddServiceForm
						onAdd={onAddButtonClick}
						onSave={onSaveButtonClick}
						onCancel={onCancelUpdateButtonClick}
						onUpdate={onUpdateButtonClick}
						onDelete={onDeleteButtonClick}
						rowToEdit={rowToEdit}
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
		justifyContent: "flex-end",
		gap: 1,
	},
};
