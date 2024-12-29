import { Box } from "@mui/material";

export default function MessageScreen({ message }) {
    return (
        <Box sx={Styles}>
            <h5>{message}</h5>
        </Box>
    );
}

const Styles = {
    position: "absolute",
    right: "50%",
    top: "50%",
    transform: "translate(50%, -50%)",
    zIndex: 100,
};
