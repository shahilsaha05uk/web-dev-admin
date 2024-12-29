import * as React from 'react';
import { Box, Modal, Stack } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import { FormProvider, useForm } from 'react-hook-form';
import PanelButton from 'core_components/buttons/PanelButton';
import { useState } from 'react';
import { useEffect } from 'react';
import UpdateServiceForm from './UpdateServiceForm';
import useUpdateServiceDetails from '../hooks/useUpdateServiceDetails';

export default function UpdateServiceModal({ open, onClose, row }) {
    // Properties
    const methods = useForm();
    const { mutate } = useUpdateServiceDetails();
    const [record, setRecord] = useState(null);

    const { handleSubmit } = methods;

    useEffect(() => {
        if (row && row.length > 0) {
            setRecord(row[0]);
            console.log('row', row);
        }
    }, [row, setRecord]);

    // Button Handlers
    const handleOnSaveButtonClick = (data) => {
        data.service_id = record.service_id;
        mutate(data);
        onClose();
    };
    const handleOnCancelSaveButtonClick = () => {
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
                        <UpdateServiceForm row={record} onCancelSave={handleOnCancelSaveButtonClick} />
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
