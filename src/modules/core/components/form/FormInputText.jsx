import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export const FormInputText = ({
    name,
    label,
    defaultControllerValue,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultControllerValue || ""}
            render={({
                field: { onChange, value, ref },
                fieldState: { error },
            }) => (
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
