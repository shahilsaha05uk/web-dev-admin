export const ServiceSchema = [
	{
		field: "service_id",
		headerName: "Service ID",
		filter: true,
		floatingFilter: true,
		editable: false,
		sort: "asc",
	},
	{
		field: "service_name",
		headerName: "Service Name",
		filter: true,
		editable: true,
		floatingFilter: true,
		cellEditor: "agTextCellEditor",
	},
	{
		field: "service_description",
		headerName: "Service Description",
		filter: false,
		sortable: false,
		editable: true,
		cellEditor: "agTextCellEditor",
	},
	{
		field: "service_cost",
		headerName: "Price",
		valueFormatter: (p) => "£" + p.value,
		editable: true,
		cellEditor: "agTextCellEditor",
	},
];
