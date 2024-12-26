import * as React from "react";
import { Box } from "@mui/material";
import { ComponentStyles } from "../../assets/compStyles";
import { useFormContext } from "react-hook-form";
import LocationField from "../LocationField";
import { FormInputText } from "../form-components/FormInputText";
import PanelButton from "../PanelButton";
import { useEffect, useState } from "react";

export default function AddForm(props) {
	// form hooks
	const methods = useFormContext();

	// Props
	const { onAdd, onCancel, onUpdate, editRow } = props;
	const { handleSubmit, setValue, reset } = methods;

	// States
	const [location, setLocation] = useState(null);
	const [buttonDisabled, setButtonDisabled] = useState({
		add: false,
		edit: true,
		cancel: true,
		update: true,
	});

	// Handlers
	// This function calls the onAdd method from the props passed and resets the form fields for another entry
	const handleAdd = (data) => {
		if (onAdd) onAdd(data);
		reset();
	};

	// This function will populate the form fields with the data from the row that was clicked and enable the cancel and update button
	const handleEdit = () => {
		if (editRow) {
			const data = editRow.data;
			Object.entries(data).forEach(([key, value]) => {
				setValue(key, value); // Dynamically set values in the form
			});
		} else {
			// Reset form to empty when editRow is null
			reset();
		}

		// And only enable the cancel and update button
		setButtonDisabled({
			add: true,
			edit: true,
			cancel: false,
			update: false,
		});
	};

	// This function calls the onUpdate method from the props passed and resets the form fields for another entry
	const handleUpdate = (data) => {
		if (onUpdate) onUpdate(data);
		reset();

		setButtonDisabled({
			add: false,
			edit: true,
			cancel: true,
			update: true,
		});
	};

	// This function resets the form fields and disables the cancel and update button
	const handleCancel = () => {
		// enable the add button and disable the rest
		setButtonDisabled({
			add: false,
			edit: true,
			cancel: true,
			update: true,
		});

		// Clear out all the fields
		reset();

		// Call the onCancel function
		if (onCancel) onCancel();
	};

	// This function sets the location field in the form
	const OnLocationSet = (location) => {
		setLocation(location);
		setValue("postcode", location.address);
	};

	// Effects

	// This effect will enable the edit button and disable the add button when the editRow is not null
	useEffect(() => {
		if (editRow) {
			// if the Edit row request is in, then enable the edit button and disable the add button
			setButtonDisabled({
				...buttonDisabled,
				add: true,
				edit: false,
			});
		} else {
			// Reset form to empty when editRow is null
			reset();

			// enable the add button and disable the rest
			setButtonDisabled({
				add: false,
				edit: true,
				cancel: true,
				update: true,
			});
		}
	}, [editRow, setValue, reset]);

	return (
		<Box sx={ComponentStyles.modal.form.main}>
			<Box sx={ComponentStyles.modal.form.content}>
				{/* Form Fields */}
				<FormInputText name="name" label="Restaurant name" />
				<FormInputText name="city" label="City" />
				<LocationField
					name="postcode"
					label="Postcode"
					onPlaceSelect={OnLocationSet}
					isFormField={true}
				/>
				<FormInputText name="description" label="Description" />

				{/* Buttons */}
				<Box sx={Styles.btnBox}>
					<PanelButton
						name="add"
						label="Add"
						onClick={handleSubmit(handleAdd)}
						disabled={buttonDisabled.add}
					/>
					<Box sx={Styles.updateBox} pointerEvents="none">
						<PanelButton
							name="edit"
							label="Edit"
							sx={{ flex: 1 }}
							onClick={handleEdit}
							disabled={buttonDisabled.edit}
						/>
						<PanelButton
							name="delete"
							label="Delete"
							sx={{ flex: 1 }}
							onClick={handleEdit}
							disabled={buttonDisabled.edit}
						/>
					</Box>

					<Box sx={Styles.updateBox} pointerEvents="none">
						<PanelButton
							name="update"
							label="Update"
							onClick={handleSubmit(handleUpdate)}
							sx={{ flex: 1 }}
							disabled={buttonDisabled.update}
						/>
						<PanelButton
							name="cancel-update"
							label="Cancel Update"
							onClick={handleCancel}
							sx={{ flex: 1 }}
							disabled={buttonDisabled.cancel}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

const Styles = {
	btnBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		gap: 2,
	},
	updateBox: {
		display: "inline-flex",
		alignItems: "stretch",
		flexDirection: "row",
		justifyContent: "stretch",
		gap: 2,
	},
};
