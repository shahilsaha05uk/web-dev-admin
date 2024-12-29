export function AddRow(tableRef, data) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    return gridApi.applyTransaction({ add: [data] });
}

export function AddRows(tableRef, data) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    return gridApi.applyTransaction({ add: data });
}

export function UpdateSelectedRow(tableRef, data) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    gridApi.applyTransaction({ update: [data] });
}

export function DeleteSelectedRow(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    const selectedRows = gridApi.getSelectedRows();

    gridApi.applyTransaction({ remove: selectedRows });
}

export function ClearTable(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    const rows = GetRowData(tableRef);
    gridApi.applyTransaction({ remove: rows });
}

export function RefreshTable(tableRef, data = []) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    ClearTable(tableRef);
    AddRows(tableRef, data);
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

export function GetRowData(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return [];

    const rowData = [];
    gridApi.forEachNode((node) => {
        rowData.push(node.data);
    });

    return rowData;
}

export function GetRowDataFromSelectedRows(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return [];

    return gridApi.getSelectedRows();
}

export function GetSelectedRowsFromTableRef(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
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
