import * as React from 'react';
import { Container } from '@mui/material';

import { ComponentStyles } from 'assets/compStyles';
import Navbar from '@/Navbar';

export default function Page() {
    return (
        <Container disableGutters sx={ComponentStyles.rootContainer}>
            <Navbar />
        </Container>
    );
}
