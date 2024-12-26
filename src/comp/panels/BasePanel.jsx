import { Box } from "@mui/material";
import { ComponentStyles } from "../../assets/compStyles";

export default function BasePanel({ children, ...props }) {
	return (
		<Box sx={ComponentStyles.basePanel} {...props}>
			{children}
		</Box>
	);
}
