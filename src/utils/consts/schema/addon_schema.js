export const AddonSchema = {
	colDefs: [
		{
			field: "addon_id",
			headerName: "Addon ID",
			filter: true,
			floatingFilter: true,
			editable: false,
			sort: "asc",
		},
		{
			field: "service_id",
			headerName: "Service ID",
			filter: true,
			editable: true,
			floatingFilter: true,
			cellEditor: "agTextCellEditor",
		},
		{
			field: "addon_name",
			headerName: "Addon Name",
			filter: true,
			editable: true,
			floatingFilter: true,
			cellEditor: "agTextCellEditor",
		},
		{
			field: "addon_description",
			headerName: "Addon Description",
			filter: false,
			sortable: false,
			editable: true,
			cellEditor: "agTextCellEditor",
		},
		{
			field: "addon_cost",
			headerName: "Price",
			valueFormatter: (p) => "£" + p.value,
			editable: true,
			cellEditor: "agTextCellEditor",
		},
	],
};
