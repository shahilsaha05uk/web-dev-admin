import { GetRowDataFromSelectedRows } from 'helper/table_helper';

export function GetPermanentIDsFromSelectedRows(tableRef) {
    const data = GetRowDataFromSelectedRows(tableRef);
    const ids = [];
    data.forEach((row) => {
        ids.push(row.service_id);
    });
    return ids;
}
