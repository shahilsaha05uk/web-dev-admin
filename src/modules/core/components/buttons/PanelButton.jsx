import { Button } from "@mui/material";
import * as React from "react";

export default function PanelButton({ label, ...props }) {
    return (
        <Button variant="contained" {...props}>
            {label}
        </Button>
    );
}
