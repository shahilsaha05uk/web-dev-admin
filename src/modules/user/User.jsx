import DGTable from "core_components/tables/DGTable";
import BasePanel from "core_components/panels/BasePanel";
import { useFetchAllUserDetails } from "api/fetch/useFetchAllUserDetails";
import { useDataMemo } from "core/memos/table/useDataMemo";
import LoadingRadial from "core_components/misc/LoadingRadial";
import ErrorScreen from "core_components/misc/ErrorScreen";
import { ComponentStyles } from "assets/compStyles";
import { Box } from "@mui/material";
import { UserSchema } from "user/schema/user_schema";

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
                    cols={UserSchema}
                    rows={memoData}
                />
            </Box>
        </BasePanel>
    );
}
