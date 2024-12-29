import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInputText } from 'core_components/form/FormInputText';
import PanelButton from 'core_components/buttons/PanelButton';

export default function AddAddonForm(props) {
    //#region  Properties
    // form hooks
    const methods = useForm();

    const rowToEdit = useSelector((state) => state.addServiceModal.rowToEdit);

    // Props
    const { onAdd, onCancel, onUpdate, onDelete } = props;
    const { handleSubmit, setValue, reset } = methods;

    // States
    const [isEditing, setIsEditing] = useState(false);
    //#endregion Properties

    //#region  Handlers
    // This function calls the onAdd method from the props passed and resets the form fields for another entry
    const handleOnAddButtonClick = (data) => {
        if (onAdd) onAdd(data);
        reset();
    };
    //#endregion Handlers

    //#region Button Handlers
    // This function will populate the form fields with the data from the row that was clicked and enable the cancel and update button
    const handleOnEditButtonClick = () => {
        if (rowToEdit) {
            const data = rowToEdit.data;
            Object.entries(data).forEach(([key, value]) => {
                setValue(key, value); // Dynamically set values in the form
            });

            setIsEditing(true);
        } else {
            // Reset form to empty when editRow is null
            reset();
            setIsEditing(false);
        }
    };

    const handleOnDeleteButtonClick = () => {
        if (onDelete) onDelete(rowToEdit);
        reset();
    };

    // This function calls the onUpdate method from the props passed and resets the form fields for another entry
    const handleOnUpdateButtonClick = (data) => {
        if (onUpdate) onUpdate(data);
        reset();
    };

    // This function resets the form fields and disables the cancel and update button
    const handleOnCancelButtonClick = () => {
        // Clear out all the fields
        reset();

        setIsEditing(false);

        // Call the onCancel function
        if (onCancel) onCancel();
    };
    //#endregion

    return (
        <FormProvider {...methods}>
            <Box sx={ComponentStyles.modal.form.main}>
                <Box sx={ComponentStyles.modal.form.content}>
                    {/* Form Fields */}
                    <FormInputText name="addon_name" label="Addon Title" />
                    <FormInputText name="addon_cost" label="Price in £0.00" type="number" />
                    <FormInputText name="addon_description" label="Description" />

                    {/* Buttons */}
                    <Box sx={Styles.btnBox}>
                        <PanelButton
                            name="add"
                            label="Add"
                            onClick={handleSubmit(handleOnAddButtonClick)}
                            disabled={rowToEdit}
                        />

                        {/* Edit and Delete Buttons */}
                        <Box sx={Styles.updateBox} pointerEvents="none">
                            <PanelButton
                                name="edit"
                                label="Edit"
                                sx={{ flex: 1 }}
                                onClick={handleOnEditButtonClick}
                                disabled={!rowToEdit || isEditing}
                            />
                            <PanelButton
                                name="delete"
                                label="Delete"
                                color="error"
                                sx={{ flex: 1 }}
                                onClick={handleOnDeleteButtonClick}
                                disabled={!rowToEdit || isEditing}
                            />
                        </Box>

                        {/* Update and Cancel Update Button */}
                        <Box sx={Styles.updateBox} pointerEvents="none">
                            <PanelButton
                                name="update"
                                label="Update"
                                onClick={handleSubmit(handleOnUpdateButtonClick)}
                                sx={{ flex: 1 }}
                                disabled={!isEditing}
                            />
                            <PanelButton
                                name="cancel-update"
                                label="Cancel Update"
                                onClick={handleOnCancelButtonClick}
                                sx={{ flex: 1 }}
                                disabled={!isEditing}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </FormProvider>
    );
}

const Styles = {
    btnBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
    },
    updateBox: {
        display: 'inline-flex',
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'stretch',
        gap: 2,
    },
};
