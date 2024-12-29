import * as React from 'react';
import { Box } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { FormInputText } from 'core_components/form/FormInputText';

export default function UpdateAddonForm(props) {
    const methods = useFormContext();
    const { setValue, reset } = methods;
    const { row } = props;

    // when the row changes, update the form fields
    useEffect(() => {
        if (row) {
            const { addon_name, addon_cost, addon_description } = row;

            setValue('addon_name', addon_name || '');
            setValue('addon_cost', addon_cost || '');
            setValue('addon_description', addon_description || '');
        }
    }, [row]);

    return (
        <Box sx={ComponentStyles.modal.form.main}>
            <Box sx={ComponentStyles.modal.form.content}>
                {/* Form Fields */}
                <FormInputText name="addon_name" label="Addon Name" />
                <FormInputText name="addon_cost" label="Cost" />
                <FormInputText name="addon_description" label="Description" />
            </Box>
        </Box>
    );
}
