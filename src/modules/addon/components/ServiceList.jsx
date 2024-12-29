import { Box, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { useFetchAllServiceIDs } from '../hooks/useFetchServiceID';
import LoadingRadial from 'modules/core/components/misc/LoadingRadial';
import ErrorScreen from 'modules/core/components/misc/ErrorScreen';
import { useState } from 'react';
import '@/styles.css';
import { isTheSameIndex } from '../utils/addon_helper';

function ListItems(props) {
    const { onClick, selectedItem, data } = props;

    if (!data || data.length === 0) return null; // Handle null or empty data

    // Return a new array of list items
    return data.map((d, index) => (
        <ListItem key={d} sx={Styles.listItem} disablePadding={true}>
            <ListItemButton
                id={d}
                selected={selectedItem ? isTheSameIndex(selectedItem.index, index) : false}
                onClick={(event) => onClick(event, index, d)}
                sx={Styles.listItemButton}
            >
                <ListItemText primary={'Service ' + d} />
            </ListItemButton>
        </ListItem>
    ));
}

export default function ServiceList(props) {
    const { onListItemClick, selectedItem } = props;
    const { data, isFetching, isError, error } = useFetchAllServiceIDs();

    if (isFetching) return <LoadingRadial />;
    if (isError) return <ErrorScreen error={error} />;

    return (
        <Box sx={Styles.container}>
            <Box sx={Styles.content}>
                <List
                    sx={Styles.list}
                    dense={true}
                    aria-labelledby="nested-list-subheader"
                    component="nav"
                    subheader={
                        <ListSubheader sx={Styles.listHeader} component="div" id="nested-list-subheader">
                            Service List
                        </ListSubheader>
                    }
                >
                    <ListItems data={data} onClick={onListItemClick} selectedItem={selectedItem} />
                </List>
            </Box>
        </Box>
    );
}

const Styles = {
    container: {
        height: '100%',
        width: '30%',
        border: '1px solid #000',
        borderRadius: 2,
    },
    content: {
        width: '100%',
        height: '100%',
    },
    list: {
        bgcolor: '#000',
        borderRadius: 2,
        height: '100%',
        p: 0.5,
        overflow: 'auto',
    },
    listHeader: {
        borderRadius: 2,
        color: '#000',
    },
    listItem: {
        bgcolor: '#f0f0f0',
        borderRadius: 2,
        color: '#000',
        marginY: 0.5,
    },
    listItemButton: {
        '&.Mui-selected': {
            bgcolor: 'primary.main', // Custom background for selected
            color: 'white', // Custom text color for selected
            borderRadius: 2,
        },
        '&.Mui-selected:hover': {
            bgcolor: 'primary.dark', // Custom hover state for selected
            borderRadius: 2,
        },
    },
};
