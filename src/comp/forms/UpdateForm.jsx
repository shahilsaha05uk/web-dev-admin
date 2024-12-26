import * as React from "react";
import { Box } from "@mui/material";
import { ComponentStyles } from "../../assets/compStyles";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import LocationField from "../LocationField";
import { useState, useEffect } from "react";
import { FormInputText } from "../form-components/FormInputText";

export default function UpdateForm(props) {
	const methods = useFormContext();

	const { setValue, reset } = methods;
	const [location, setLocation] = useState(null);

	const { data, onSave, onCancelSave } = props;

	// methods
	const OnLocationSet = (location) => {
		setLocation(location);
		setValue("postcode", location.address);
	};

	useEffect(() => {
		if (data) {
			const { name, city, postcode, description } = data;

			setValue("name", name || "");
			setValue("city", city || "");
			setValue("postcode", postcode || "");
			setValue("description", description || "");
		}
	}, [data]);

	return (
		<Box sx={ComponentStyles.modal.form.main}>
			<FormProvider {...methods}>
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
				</Box>
			</FormProvider>
		</Box>
	);
}
