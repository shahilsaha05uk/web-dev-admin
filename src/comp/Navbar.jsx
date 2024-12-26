import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Home from "./panels/Home";
import Review from "./panels/Review";
import { ComponentStyles } from "../assets/compStyles";
import Users from "./panels/User";
import Services from "./panels/Services";

const navNum = 1;

const styles = {
	panel: {
		height: "100%",
	},
};

function OpenPanel(props) {
	const { value } = props;
	if (value === 0) {
		return <Home />;
	} else if (value === 1) {
		return <Services />;
	} else if (value === 2) {
		return <Review />;
	} else if (value === 3) {
		return <Users />;
	}

	return null;
}

export default function Navbar() {
	const [value, setValue] = React.useState(navNum);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={styles.panel}>
			{/* Tabs */}
			<Box sx={ComponentStyles.navbar.panel}>
				<Tabs value={value} onChange={handleChange} indicatorColor="primary">
					<Tab label="Home"></Tab>
					<Tab label="Services"></Tab>
					<Tab label="Addons"></Tab>
					<Tab label="Users"></Tab>
					<Tab label="Bookings"></Tab>
				</Tabs>
			</Box>
			{/* Panel */}
			<OpenPanel value={value} />
		</Box>
	);
}
