import { themeQuartz } from "ag-grid-community";

export const TableTheme = themeQuartz.withParams({
	selectedRowBackgroundColor: "rgba(0, 255, 0, 0.1)",
});

export const TableData = {
	serviceTable: [
		{
			field: "id",
			headerName: "Service ID",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "name",
			headerName: "Service Name",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "description",
			headerName: "Description",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "price",
			headerName: "price",
			lockPosition: true,
			flex: 1,
		},
	],

	modalRestaurantTable: [
		{
			field: "name",
			headerName: "Restaurant Name",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "city",
			headerName: "City",
			lockPosition: true,
			suppressSizeToFit: true,
			flex: 1,
		},
		{
			field: "postcode",
			headerName: "Postal Code",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "description",
			headerName: "Description",
			lockPosition: true,
			flex: 1,
		},
	],

	// Users
	userTable: [
		{
			field: "id",
			headerName: "ID",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "username",
			headerName: "Username",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "password",
			headerName: "Password",
			lockPosition: true,
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			lockPosition: true,
			flex: 1,
		},
	],
};

export const TABLETYPES = {
	PAGE: "page",
	MODAL: "modal",
};
