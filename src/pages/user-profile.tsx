import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '../../types/user';
import api from '../libs/api';

const theme = createTheme({
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

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const [tempData, setTempData] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!id) {
        setError('No user ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/user/${id}`);
        const user = response.data;
        setUserData(user);
        setTempData(user);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!tempData || JSON.stringify(tempData) === JSON.stringify(userData)) {
      setIsEditing(false);
      return;
    }
    setUserData(tempData);
    setIsEditing(false);
    try {
      setIsLoading(true);
      await api.put(`/api/user/${id}`, tempData);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to save user data');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !userData) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error || 'User data not available'}</Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          px: { xs: 2, sm: 3 },
        }}>
        <Card
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '1000px' },
          }}>
          <CardHeader title="User Profile" />

          <CardContent>
            {isEditing ? (
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="name"
                  name="name"
                  value={tempData?.name || ''}
                  onChange={handleInputChange}
                  sx={{ mt: 1, mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="email"
                  name="email"
                  type="email"
                  value={tempData?.email || ''}
                  onChange={handleInputChange}
                  sx={{ mt: 1, mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="phone"
                  name="phone"
                  value={tempData?.phone || ''}
                  onChange={handleInputChange}
                  sx={{ mt: 1, mb: 2 }}
                />
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData?.name}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData?.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  phone
                </Typography>
                <Typography variant="body1">{userData?.phone}</Typography>
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {isEditing ? (
              <>
                <Button startIcon={<CloseIcon />} onClick={handleCancel} variant="outlined">
                  cancel
                </Button>
                <Button startIcon={<SaveIcon />} onClick={handleSave} variant="contained" color="primary">
                  save
                </Button>
              </>
            ) : (
              <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)} variant="contained" color="primary">
                edit
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
