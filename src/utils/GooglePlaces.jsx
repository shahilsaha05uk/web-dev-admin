import { TextField } from "@mui/material";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { GetLocationObject } from "./locationUtils";
import { FormInputText } from "../comp/form-components/FormInputText";

export const GooglePlaces = forwardRef(
	({ onPlaceSelect, name, label, isFormField, ...props }, ref) => {
		const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
		const inputRef = useRef(null);
		const places = useMapsLibrary("places");
		// This is when the place is loaded
		useEffect(() => {
			if (!places || !inputRef.current) return;

			// this defines all the fields to fetch from the place
			const options = {
				//types: ["(cities)"],
				fields: ["geometry", "formatted_address"],
			};

			setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
		}, [places]);

		// This is when the place is selected
		useEffect(() => {
			if (!placeAutocomplete) return;
			placeAutocomplete.addListener("place_changed", () => {
				// first: it gets the place as an object
				const place = placeAutocomplete.getPlace();

				if (place) {
					// second: it gets the location object
					const locationObject = GetLocationObject(place);

					// third: finally it calls the callback and updates the location object
					onPlaceSelect(locationObject);
				}
			});
		}, [onPlaceSelect, placeAutocomplete]);

		return (
			<div
				className="autocomplete-container"
				style={{
					width: "100%",
					flexDirection: "column",
					display: "flex",
				}}
			>
				{/* This will return a form field if the parent is a form else, a basic Text Field */}
				{isFormField ? (
					<FormInputText
						label={label}
						name={name}
						inputRef={inputRef}
						{...props}
					/>
				) : (
					<TextField
						label="Postal"
						size="small"
						inputRef={inputRef}
						{...props}
					/>
				)}
			</div>
		);
	}
);
