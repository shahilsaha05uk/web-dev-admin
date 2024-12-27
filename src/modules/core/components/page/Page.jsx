import * as React from "react";
import { Container } from "@mui/material";
import Navbar from "core/components/Navbar";
import { ComponentStyles } from "assets/compStyles";

export default function Page() {
    return (
        <Container disableGutters sx={ComponentStyles.rootContainer}>
            <Navbar />
        </Container>
    );
}
