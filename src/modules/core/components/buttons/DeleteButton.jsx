import * as React from 'react';
import PanelButton from './PanelButton';

export default function DeleteButton({ onClick, valueFormatted }) {
    return (
        <PanelButton
            variant="contained"
            color="error"
            label="Delete"
            {...props}
            onClick={onClick}
            valueFormatted={valueFormatted}
        />
    );
}
