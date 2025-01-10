import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      main: '#0078D4',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#0078D4',
          color: 'white',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          padding: '16px',
        },
      },
    },
  },
});
