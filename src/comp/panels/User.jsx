import { useState } from "react";
import { TableData } from "../../utils/consts/tableConsts";
import DGTable from "../tables/DGTable";
import BasePanel from "./BasePanel";
import { useEffect } from "react";
import { useFetchAllUserDetails } from "../../utils/externalUtils/fetchers/useFetchAllUserDetails";
import { useDataMemo } from "../../utils/memos/table/useDataMemo";
import LoadingRadial from "../misc/LoadingRadial";
import ErrorScreen from "../misc/ErrorScreen";
import { ComponentStyles } from "../../assets/compStyles";
import { Box } from "@mui/material";

export default function Users() {
	const { data, isLoading, isError, isSuccess, error } =
		useFetchAllUserDetails();

	const memoData = useDataMemo(data);

	// Render loading or error states
	if (isLoading) return <LoadingRadial />;
	if (isError) {
		console.error("Error fetching data:", error);
		return <ErrorScreen error={error} />;
	}

	return (
		<BasePanel>
			<h1>Users</h1>

			<Box sx={ComponentStyles.pageTable}>
				<DGTable
					pagination
					paginationPageSizeSelector={[10, 20, 30, 100]}
					paginationPageSize={10}
					cols={TableData.userTable}
					rows={memoData}
				/>
			</Box>
		</BasePanel>
	);
}
