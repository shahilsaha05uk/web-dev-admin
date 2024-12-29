import { GetRowDataFromSelectedRows } from 'helper/table_helper';

export function GetPermanentIDsFromSelectedRows(gridApi) {
    const data = gridApi.getSelectedRows();
    const ids = [];
    data.forEach((row) => {
        ids.push(row.service_id);
    });
    return ids;
}
