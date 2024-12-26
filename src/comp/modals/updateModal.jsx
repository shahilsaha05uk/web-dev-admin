import * as React from "react";
import { Box, Modal, Stack } from "@mui/material";
import { ComponentStyles } from "../../assets/compStyles";
import { FormProvider, useForm } from "react-hook-form";
import PanelButton from "../PanelButton";
import { useState } from "react";
import UpdateForm from "../forms/UpdateForm";
import useUpdateRestaurantDetails from "../../utils/externalUtils/posters/useUpdateRestaurantDetails";
import { useEffect } from "react";

export default function UpdateModal({ open, onClose, row }) {
	const methods = useForm();
	const { mutate } = useUpdateRestaurantDetails();
	const [record, setRecord] = useState(null);

	const { handleSubmit } = methods;

	useEffect(() => {
		if (row && row.length > 0) setRecord(row[0]);
	}, [row, setRecord]);

	const onSave = (data) => {
		data.id = record.id;
		mutate(data);
		onClose();
	};
	const onCancelSave = () => {
		setData(null);
		onClose();
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
					{/* The form to handle all the fields in the form */}

					<FormProvider {...methods}>
						<UpdateForm data={record} onCancelSave={onCancelSave} />
					</FormProvider>
				</Box>

				{/* Stack to hold the Save button and the Cancel Button */}
				<Stack direction="row" sx={ModalStyles.btnStack}>
					<PanelButton label="Save Changes" onClick={handleSubmit(onSave)} />
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
