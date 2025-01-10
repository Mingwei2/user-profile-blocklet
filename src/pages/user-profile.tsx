import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { updateUserSchema } from '../../schemas/user-schema';
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const validateField = (name: string, value: string) => {
    try {
      updateUserSchema.shape[name as keyof typeof updateUserSchema.shape].parse(value);
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: e.errors[0]?.message || '',
        }));
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
    setTempData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const validateForm = () => {
    const result = updateUserSchema.safeParse(tempData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      return false;
    }
    setFormErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!tempData || JSON.stringify(tempData) === JSON.stringify(userData)) {
      setIsEditing(false);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await api.put(`/api/user/${id}`, tempData);
      setUserData(tempData);
      setIsEditing(false);
      setShowSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to save user data');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
    setFormErrors({});
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (lang?: string) => {
    setAnchorEl(null);
    if (lang) {
      i18n.changeLanguage(lang);
    }
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
          <CardHeader
            title={t('user_profile')}
            action={
              <>
                <IconButton onClick={handleLanguageClick} color="inherit">
                  <TranslateIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleLanguageClose()}>
                  <MenuItem onClick={() => handleLanguageClose('en')}>English</MenuItem>
                  <MenuItem onClick={() => handleLanguageClose('zh')}>中文</MenuItem>
                </Menu>
              </>
            }
          />

          <CardContent>
            {isEditing ? (
              <Box component="section">
                <TextField
                  fullWidth
                  label={t('name')}
                  name="name"
                  value={tempData?.name || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name ? t('name_field_error') : null}
                  sx={{ mt: 2, mb: 3 }}
                />
                <TextField
                  fullWidth
                  label={t('email')}
                  name="email"
                  type="email"
                  value={tempData?.email || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email ? t('email_field_error') : null}
                  sx={{ mt: 2, mb: 3 }}
                />
                <TextField
                  fullWidth
                  label={t('phone')}
                  name="phone"
                  value={tempData?.phone || ''}
                  onChange={handleInputChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone ? t('phone_field_error') : null}
                  sx={{ mt: 2, mb: 3 }}
                />
              </Box>
            ) : (
              <Box component="section">
                <Typography variant="body2" color="text.secondary">
                  {t('name')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData?.name}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {t('email')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData?.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {t('phone')}
                </Typography>
                <Typography variant="body1">{userData?.phone}</Typography>
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {isEditing ? (
              <>
                <Button startIcon={<CloseIcon />} onClick={handleCancel} variant="outlined">
                  {t('cancel')}
                </Button>
                <Button startIcon={<SaveIcon />} onClick={handleSave} variant="contained" color="primary">
                  {t('save')}
                </Button>
              </>
            ) : (
              <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)} variant="contained" color="primary">
                {t('edit')}
              </Button>
            )}
          </CardActions>
        </Card>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            {t('successfully_saved')}
          </Alert>
        </Snackbar>
        <Snackbar
          open={error !== null}
          autoHideDuration={3000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {t('something_went_wrong')}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
