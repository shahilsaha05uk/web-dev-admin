export function AddRow(gridApi, data) {
    if (!gridApi) return;

    return gridApi.applyTransaction({ add: [data] });
}

export function AddRows(gridApi, data) {
    if (!gridApi) return;

    return gridApi.applyTransaction({ add: data });
}

export function UpdateSelectedRow(gridApi, data) {
    if (!gridApi) return;

    gridApi.applyTransaction({ update: [data] });
}

export function DeleteSelectedRow(gridApi) {
    if (!gridApi) return;

    const selectedRows = gridApi.getSelectedRows();

    gridApi.applyTransaction({ remove: selectedRows });
}

export function ClearTable(gridApi) {
    if (!gridApi) return;

    const rows = GetRowData(gridApi);
    gridApi.applyTransaction({ remove: rows });
}

export function RefreshTable(gridApi, data = []) {
    if (!gridApi) return;

    ClearTable(gridApi);
    AddRows(gridApi, data);
}

export function isSameRow(row1, row2) {
    return row1?.data.id === row2?.data.id;
}

export function GetAPIFromTableRef(tableRef) {
    if (!tableRef.current) {
        console.log('Table reference is not available');
        return;
    }

    const gridApi = tableRef.current?.api;
    return gridApi || null;
}

export function GetRowData(gridApi) {
    if (!gridApi) return [];

    const rowData = [];
    gridApi.forEachNode((node) => {
        rowData.push(node.data);
    });

    return rowData;
}

export function GetRowDataFromSelectedRows(gridApi) {
    if (!gridApi) return [];

    return gridApi.getSelectedRows();
}

export function GetSelectedRowsFromTableRef(gridApi) {
    if (!gridApi) return [];

    return gridApi.getSelectedRows();
}

export function GetIDsFromSelectedRows(gridApi, col_id) {
    const data = gridApi.getSelectedRows();
    const ids = [];
    data.forEach((row) => {
        ids.push(row[col_id]);
    });
    return ids;
}
