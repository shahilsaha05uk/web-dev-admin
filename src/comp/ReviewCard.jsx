import * as React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from "@mui/material";
import { ComponentStyles } from "../assets/compStyles";
import PanelButton from "./PanelButton";

export default function ReviewCard({ title, content, ...props }) {
	return (
		<Card variant="elevation" sx={ComponentStyles.reviewCard.main} {...props}>
			<Stack spacing={2} direction="row">
				<CardHeader title={title} sx={ComponentStyles.reviewCard.header} />
				<CardContent sx={ComponentStyles.reviewCard.content}>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{content}
					</Typography>
				</CardContent>

				<Stack
					spacing={2}
					direction="row"
					sx={ComponentStyles.reviewCard.buttons}
				>
					<PanelButton label="Approve" />
					<PanelButton label="Reject" />
				</Stack>
			</Stack>
		</Card>
	);
}
