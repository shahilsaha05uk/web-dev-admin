import * as React from 'react';
import { Box, Modal, Stack } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import { FormProvider, useForm } from 'react-hook-form';
import PanelButton from 'core_components/buttons/PanelButton';
import { useState } from 'react';
import { useEffect } from 'react';
import useUpdateAddonDetails from '../hooks/useUpdateAddonDetails';
import UpdateAddonForm from './UpdateAddonForm';

export default function UpdateAddonModal({ open, onClose, row }) {
    const methods = useForm();
    const { mutate } = useUpdateAddonDetails();
    const [record, setRecord] = useState(null);

    const { handleSubmit } = methods;

    // Set the record to the form fields
    useEffect(() => {
        if (row && row.length > 0) {
            setRecord(row[0]);
            console.log('row', row);
        }
    }, [row, setRecord]);

    //#region  Button Handlers
    const handleOnSaveButtonClick = (data) => {
        data.addon_id = record.addon_id;
        console.log('data', data);
        mutate(data);
        onClose();
    };
    const handleOnCancelSaveButtonClick = () => {
        setData(null);
        onClose();
    };
    //#endregion Button Handlers

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
                        <UpdateAddonForm row={record} onCancelSave={handleOnCancelSaveButtonClick} />
                    </FormProvider>
                </Box>

                {/* Stack to hold the Save button and the Cancel Button */}
                <Stack direction="row" sx={ModalStyles.btnStack}>
                    <PanelButton label="Save Changes" onClick={handleSubmit(handleOnSaveButtonClick)} />
                    <PanelButton label="Cancel" onClick={onClose} />
                </Stack>
            </Box>
        </Modal>
    );
}

const ModalStyles = {
    btnStack: {
        justifyContent: 'flex-end',
        gap: 1,
    },
};

const rowsSelectionData = {
    mode: 'singleRow',
    enableClickSelection: true,
    checkboxes: true,
};
