import { Box, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { useFetchAllServiceIDs } from '../hooks/useFetchServiceID';

function ListItems(data) {
    return data.map((item) => (
        <ListItem key={item.service_id}>
            <ListItemButton>
                <ListItemText primary={item.name} />
            </ListItemButton>
        </ListItem>
    ));
}

export default function ServiceList(props) {
    const { data } = useFetchAllServiceIDs();

    return (
        <Box sx={Styles.container}>
            <Box sx={Styles.content}>
                <List
                    sx={Styles.list}
                    aria-labelledby="nested-list-subheader"
                    component="nav"
                    subheader={
                        <ListSubheader
                            sx={{ borderRadius: 2, color: '#000' }}
                            component="div"
                            id="nested-list-subheader"
                        >
                            Service List
                        </ListSubheader>
                    }
                >
                    {ListItems(data)}
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
    },
};
