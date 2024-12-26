import { ComponentStyles } from "../../assets/compStyles";
import { AgGridReact } from "ag-grid-react";
import { Box } from "@mui/material";
import { useTableThemeMemo } from "../../utils/memos/table/useThemeMemo";
import { useColumnMemo } from "../../utils/memos/table/useColumnMemo";

export default function DGTable({ cols, rows, ...props }) {
	const themeMemo = useTableThemeMemo(); // Cache the theme
	const colMemo = useColumnMemo(cols); // Cache the columns
	const styles = ComponentStyles.modal.table;

	return (
		<Box sx={styles.main}>
			<Box sx={styles.container}>
				<AgGridReact
					rowData={rows}
					columnDefs={colMemo}
					theme={themeMemo}
					suppressCellFocus={true}
					suppressHeaderFocus={true}
					{...props}
				/>
			</Box>
		</Box>
	);
}
