export function GetAPIFromTableRef(tableRef) {
    if (!tableRef.current) {
        console.log("Table reference is not available");
        return;
    }

    const gridApi = tableRef.current?.api;
    return gridApi || null;
}

export function GetSelectedRowsFromTableRef(tableRef) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return [];

    return gridApi.getSelectedRows();
}

export function isSameRow(row1, row2) {
    return row1?.data.id === row2?.data.id;
}

export function UpdateRow(tableRef, rowToEdit, data) {
    const gridApi = GetAPIFromTableRef(tableRef);
    if (!gridApi) return;

    const rowNode = gridApi.getRowNode(rowToEdit.rowIndex);
    if (!rowNode) return;

    rowNode.setData(data);
}
