import { Box } from "@mui/material";
import PanelButton from "modules/core/components/buttons/PanelButton";
import { FormInputText } from "modules/core/components/form/FormInputText";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePostLoginDetails from "auth/hooks/usePostLoginDetails";

export default function LoginForm() {
    const methods = useForm();
    const navigate = useNavigate();
    const { mutate } = usePostLoginDetails();

    const { handleSubmit, getValues } = methods;

    const onSubmitButtonClick = () => {
        const { username, password } = getValues();

        mutate(
            { username, password },
            {
                onSuccess: (data) => {
                    const status = data.status;
                    if (status === 200) {
                        navigate("/");
                    }
                },
            },
        );
    };

    return (
        <FormProvider {...methods}>
            <Box sx={Styles.form}>
                <FormInputText name="username" label="Username" />
                <FormInputText name="password" label="Password" />
                <PanelButton
                    label="Submit"
                    onClick={handleSubmit(onSubmitButtonClick)}
                ></PanelButton>
            </Box>
        </FormProvider>
    );
}

const Styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "#fff",
        padding: 20,
    },
};
