import { Box, Stack } from "@mui/material";
import { useState } from "react";
import LocationField from "../comp/LocationField";

const styles = {
	panel: {
		backgroundColor: "#374954",
		color: "#ffffff",
		height: "100%",
		padding: "1rem",
		paddingTop: "10rem",

		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
};

export default function TestPanel() {
	const [selectedPlace, setSelectedPlace] = useState(null);

	return (
		<Box sx={styles.panel}>
			<h1>Location Test!!</h1>
			<Stack direction="column" spacing={2} sx={{ marginTop: "5rem" }}>
				{/* <input name="fLocation" value={value} placeholder="Location" /> */}
				<LocationField onPlaceSelect={setSelectedPlace} />
			</Stack>
		</Box>
	);
}
