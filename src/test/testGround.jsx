export default function Restaurant() {
    const [currentModal, setCurrentModal] = useState(null); // Track current modal ("add", "update", or null)
    const [editRow, setEditRow] = useState(null); // Track the row being edited
    const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
    const [records, setRecords] = useState([]); // Store records fetched from the API
    const [selectionMode, setSelectionMode] = useState(rowsSelectionData);

    const rowSelectionMemo = useRowSelectionMemo(selectionMode);
    const tableRef = useRef(null);

    // Fetch all restaurants
    const { data, isLoading, isError, isSuccess, error } =
        useFetchAllRestaurants();

    const { mutate } = useDeleteRestaurantDetails();

    // Update records when API call is successful
    useEffect(() => {
        if (isSuccess && data) {
            setRecords(data);
        }
    }, [isSuccess, data]);

    // Utility: Reset selection
    const resetSelection = () => {
        setEditRow(null);
        setSelectedRows([]);
        const gridApi = GetAPIFromTableRef(tableRef);
        if (gridApi) {
            gridApi.deselectAll();
        }
    };

    // Handlers for switching modes
    const handleMultiSelect = () => {
        if (selectionMode.mode === "singleRow") {
            setSelectionMode({ ...rowsSelectionData, mode: "multiRow" });
            resetSelection();
        }
    };

    const handleCancelMultiSelect = () => {
        if (selectionMode.mode === "multiRow") {
            setSelectionMode({ ...rowsSelectionData, mode: "singleRow" });
            resetSelection();
        }
    };

    // Handle delete operation
    const handleDelete = () => {};

    // Handle row click (for both single and multi-selection modes)
    const handleOnRowClicked = (event) => {
        const { mode } = selectionMode;

        if (mode === "singleRow") {
            const isSameRow = editRow?.data.id === event.data.id;
            setEditRow(isSameRow ? null : event);
            if (isSameRow) resetSelection();
        } else {
            const exists = selectedRows.some(
                (row) => row.rowIndex === event.rowIndex,
            );
            if (exists) {
                // Remove the row if it exists in the selectedRows
                setSelectedRows(
                    selectedRows.filter(
                        (row) => row.rowIndex !== event.rowIndex,
                    ),
                );
            } else {
                // Add the row if it doesn't exist in the selectedRows
                setSelectedRows([...selectedRows, event]);
            }
        }
    };

    // Handle row selection change (for multi-selection mode)
    const handleOnRowSelected = (event, api) => {
        if (selectionMode.mode === "multiRow") {
            const newID = event.data.id;
            const exists = selectedRows.some((row) => row.id === newID);
            if (exists) {
                setSelectedRows(selectedRows.filter((row) => row.id !== newID));
            } else {
                const gridApi = GetAPIFromTableRef(tableRef);
                const rows = gridApi.getSelectedRows();

                setSelectedRows([...selectedRows, event]);
                setSelectedRows(rows);
            }
        }
    };

    // Handle table-wide selection changes (e.g., header checkbox)
    const handleOnSelectionChanged = () => {
        const gridApi = GetAPIFromTableRef(tableRef);
        if (gridApi) {
            const selectedRowsData = gridApi.getSelectedRows();
            if (selectionMode.mode === "singleRow") {
                if (selectedRowsData.length === 0) setEditRow(null);
            } else {
                setSelectedRows(selectedRowsData);
            }
        }
    };

    // Render loading or error states
    if (isLoading) return <LoadingRadial />;
    if (isError) {
        console.error("Error fetching data:", error);
        return <ErrorScreen error={error} />;
    }

    // Render the main component
    return (
        <BasePanel>
            <div>
                <h1>Restaurant</h1>

                {/* Buttons to open modals */}
                <PanelButton
                    label="Add"
                    onClick={() => setCurrentModal("add")}
                    sx={ComponentStyles.panelButton}
                />
                <PanelButton
                    label="Update"
                    onClick={() => setCurrentModal("update")}
                    sx={ComponentStyles.panelButton}
                    disabled={!editRow || selectionMode.mode !== "singleRow"}
                />
                <PanelButton
                    label="Multi-Select"
                    onClick={handleMultiSelect}
                    sx={ComponentStyles.panelButton}
                    disabled={selectionMode.mode === "multiRow"}
                />
                <PanelButton
                    label="Cancel Multi-Select"
                    onClick={handleCancelMultiSelect}
                    sx={ComponentStyles.panelButton}
                    disabled={selectionMode.mode === "singleRow"}
                />
                <PanelButton
                    label="Delete"
                    onClick={handleDelete}
                    sx={ComponentStyles.panelButton}
                    disabled={
                        selectionMode.mode === "singleRow" ||
                        selectedRows.length === 0
                    }
                />

                {/* Main Table */}
                <Box sx={ComponentStyles.pageTable}>
                    <DGTable
                        ref={tableRef}
                        cols={TableData.mainRestaurantTable}
                        rows={records}
                        pagination
                        paginationPageSizeSelector={[10, 20, 30, 100]}
                        paginationPageSize={10}
                        rowSelection={rowSelectionMemo}
                        onRowClicked={handleOnRowClicked}
                        onRowSelected={handleOnRowSelected}
                        onSelectionChanged={handleOnSelectionChanged}
                    />
                </Box>

                {/* Modals */}
                {currentModal === "add" && (
                    <AddModal open onClose={() => setCurrentModal(null)} />
                )}
                {currentModal === "update" && (
                    <UpdateModal
                        open
                        onClose={() => setCurrentModal(null)}
                        row={editRow}
                    />
                )}
            </div>
        </BasePanel>
    );
}
