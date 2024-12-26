import { Box, Container } from "@mui/material";
import * as React from "react";
import { ComponentStyles } from "../../assets/compStyles";
import LoginForm from "../forms/LoginForm";

export default function LoginPage() {
	return (
		<Container disableGutters sx={ComponentStyles.rootContainer}>
			<Box sx={Styles.root}>
				<Box sx={Styles.content}>
					<LoginForm />
				</Box>
			</Box>
		</Container>
	);
}

const Styles = {
	root: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		border: "1px solid black",
		height: "100%",
		padding: 2,
		gap: 2,
		bgcolor: "#E38E49",
	},
	content: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
};
