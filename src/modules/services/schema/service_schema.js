export const ServiceSchema = {
    main: [
        {
            field: 'service_id',
            headerName: 'Service ID',
            filter: true,
            floatingFilter: true,
            editable: false,
            sort: 'asc',
        },
        {
            field: 'service_name',
            headerName: 'Service Name',
            filter: true,
            editable: true,
            floatingFilter: true,
            cellEditor: 'agTextCellEditor',
            flex: 1,
        },
        {
            field: 'service_description',
            headerName: 'Service Description',
            filter: false,
            sortable: false,
            editable: true,
            cellEditor: 'agTextCellEditor',
            flex: 1,
        },
        {
            field: 'service_cost',
            headerName: 'Price',
            valueFormatter: (p) => '£' + p.value,
            editable: true,
            cellEditor: 'agTextCellEditor',
            flex: 1,
        },
    ],
    modal: [
        {
            field: 'table_id',
            headerName: 'ID',
            editable: false,
        },
        {
            field: 'service_name',
            headerName: 'Service Name',
            editable: true,
            flex: 1,
        },
        {
            field: 'service_description',
            headerName: 'Service Description',
            editable: true,
            flex: 1,
        },
        {
            field: 'service_cost',
            headerName: 'Price',
            valueFormatter: (p) => '£' + p.value,
            editable: true,
            flex: 1,
        },
    ],
};
