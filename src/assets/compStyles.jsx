export const ComponentStyles = {
    rootContainer: {
        bgcolor: '#f0f0f0',
        width: '100%',
        height: '100vh',
        padding: 2,
    },
    basePanel: {
        padding: 2,
    },
    panelButton: {
        marginRight: 2,
        marginBottom: 2,
    },
    reviewCard: {
        main: {
            bgcolor: '#f0f0f0',
            borderRadius: 2,
            padding: 1,
        },
        header: {
            bgcolor: '#E38E49',
            color: '#f0f0f0',
            borderRadius: 2,
        },
        content: {
            flex: 1,
            bgcolor: '#f0f0f0',
            borderRadius: 2,
        },
    },
    pageTable: {
        height: 400,
        width: '100%',
        borderRadius: 1,
    },
    modal: {
        main: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '80%',
            bgcolor: '#4f4f4f',
            boxShadow: 24,
            borderRadius: 2,
            overflow: 'hidden',
            p: 2,

            display: 'flex',
            flexDirection: 'column',
            gap: 1,
        },
        content: {
            display: 'flex',
            flex: 1,
            gap: 1,
            height: '80%',
        },
        table: {
            main: {
                overflow: 'auto',
                width: '100%',
                height: '100%',
            },
            container: {
                height: '100%',
                width: '100%',
            },
        },
        form: {
            main: {
                width: '100%',
                padding: 2,
                bgcolor: '#f0f0f0',
                display: 'flex',
                borderRadius: 2,
            },
            content: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 2,
            },
        },
    },
    navbar: {
        panel: {
            bgcolor: '#E38E49',
            padding: 0,
            marginBottom: 1,
        },
    },
};
