import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

export const FormInputText = ({ name, label, defaultValue = '', ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <TextField
                    size="small"
                    label={label}
                    onChange={onChange}
                    value={value}
                    error={error}
                    inputRef={ref}
                    {...props}
                />
            )}
        />
    );
};
