import React from "react";
import { GooglePlaces } from "../utils/GooglePlaces";

const LocationField = ({
	name,
	label,
	onPlaceSelect,
	isFormField,
	...props
}) => {
	return (
		<GooglePlaces
			name={name}
			label={label}
			onPlaceSelect={onPlaceSelect}
			isFormField={isFormField}
			{...props}
		/>
	);
};

export default LocationField;
