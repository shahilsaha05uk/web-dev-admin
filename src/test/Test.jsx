'use client';

import React, { useCallback, useMemo, useRef, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import {
    ClientSideRowModelModule,
    LargeTextEditorModule,
    ModuleRegistry,
    ValidationModule,
    createGrid,
} from 'ag-grid-community';
import { Grid } from '@mui/material';
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    LargeTextEditorModule,
    ValidationModule /* Development Only */,
]);

const data = Array.from(Array(20).keys()).map(() => {
    return {
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
});

const TestPanel = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState(data);
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Large Text Editor',
            field: 'description',
            cellEditor: 'agLargeTextCellEditor',
            cellEditorPopup: true,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
            </div>
        </div>
    );
};

export default TestPanel;
