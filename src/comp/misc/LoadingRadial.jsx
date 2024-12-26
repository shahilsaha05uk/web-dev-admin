import { Box, CircularProgress } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export default function LoadingRadial() {
	return (
		<Box sx={Styles}>
			<CircularProgress />
		</Box>
	);
}

const Styles = {
	position: "absolute",
	right: "50%",
	top: "50%",
	zIndex: 100,
};
