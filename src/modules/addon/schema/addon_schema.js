export const AddonSchema = {
    main: [
        {
            field: "addon_id",
            headerName: "Addon ID",
            filter: true,
            floatingFilter: true,
            editable: false,
            sort: "asc",
            flex: 1,
        },
        {
            field: "service_id",
            headerName: "Service ID",
            filter: true,
            editable: true,
            floatingFilter: true,
            cellEditor: "agTextCellEditor",
            flex: 1,
        },
        {
            field: "addon_name",
            headerName: "Addon Name",
            filter: true,
            editable: true,
            floatingFilter: true,
            cellEditor: "agTextCellEditor",
            flex: 1,
        },
        {
            field: "addon_description",
            headerName: "Addon Description",
            filter: false,
            sortable: false,
            editable: true,
            cellEditor: "agTextCellEditor",
            flex: 1,
        },
        {
            field: "addon_cost",
            headerName: "Price",
            valueFormatter: (p) => "£" + p.value,
            editable: true,
            cellEditor: "agTextCellEditor",
            flex: 1,
        },
    ],
    modal: [
        {
            field: "addon_id",
            headerName: "Addon ID",
            editable: true,
            hide: true,
            flex: 1,
        },
        {
            field: "service_id",
            headerName: "Service ID",
            editable: true,
            flex: 1,

            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: [
                    "Service 1",
                    "Service 2",
                    "Service 3",
                    "Service 4",
                    "Service 5",
                ],
            },
        },
        {
            field: "addon_name",
            headerName: "Addon Name",
            editable: true,
            flex: 1,
        },
        {
            field: "addon_description",
            headerName: "Addon Description",
            editable: true,
            flex: 1,

            cellEditor: "agLargeTextCellEditor",
            cellEditorPopup: true,
            cellEditorParams: {
                maxLength: 100,
            },
        },
        {
            field: "addon_cost",
            headerName: "Price",
            valueFormatter: (p) => "£" + p.value,
            editable: true,
            flex: 1,
        },
    ],
};
