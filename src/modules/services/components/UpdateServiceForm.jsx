import * as React from 'react';
import { Box } from '@mui/material';
import { ComponentStyles } from 'assets/compStyles';
import { FormProvider, useForm } from 'react-hook-form';
import LocationField from 'core_components/fields/LocationField';
import { useState, useEffect } from 'react';
import { FormInputText } from 'core_components/form/FormInputText';

export default function UpdateServiceForm(props) {
    const methods = useForm();

    const { setValue, reset } = methods;
    const [location, setLocation] = useState(null);

    const { row, onSave, onCancelSave } = props;

    // methods
    const OnLocationSet = (location) => {
        setLocation(location);
        setValue('service_city', location.address);
    };

    useEffect(() => {
        if (row) {
            const { service_name, service_cost, service_city, service_description } = row;

            setValue('service_name', service_name || '');
            setValue('service_cost', service_cost || '');
            setValue('service_city', service_city || '');
            setValue('service_description', service_description || '');
        }
    }, [row]);

    return (
        <Box sx={ComponentStyles.modal.form.main}>
            <FormProvider {...methods}>
                <Box sx={ComponentStyles.modal.form.content}>
                    {/* Form Fields */}
                    <FormInputText name="service_name" label="Restaurant name" />
                    <FormInputText name="service_cost" label="Cost" />
                    <LocationField name="service_city" label="City" onPlaceSelect={OnLocationSet} isFormField={true} />
                    <FormInputText name="service_description" label="Description" />
                </Box>
            </FormProvider>
        </Box>
    );
}