import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  ThemeProvider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { updateUserSchema } from '../../schemas/user-schema';
import { User } from '../../types/user';
import LanguageSwitch from '../components/language-switch';
import Toast from '../components/toast';
import DisplayInfo from '../components/user-profile/display-info';
import EditForm from '../components/user-profile/edit-form';
import api from '../libs/api';
import theme from '../theme';
import { validateField, validateForm } from '../utils/validation';

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const [tempData, setTempData] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();

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
    validateField(updateUserSchema as z.ZodObject<any>, name, value, setFormErrors);
    setTempData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!tempData || JSON.stringify(tempData) === JSON.stringify(userData)) {
      setIsEditing(false);
      return;
    }

    if (!validateForm(updateUserSchema as z.ZodObject<any>, tempData, setFormErrors)) {
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
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <CardHeader title={t('user_profile')} action={<LanguageSwitch color="inherit" />} />
          <CardContent sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <EditForm tempData={tempData} formErrors={formErrors} handleInputChange={handleInputChange} />
            ) : (
              <DisplayInfo userData={userData} />
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
        <Toast
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          severity="success"
          messageKey="successfully_saved"
        />
        <Toast
          open={error !== null}
          onClose={() => setError(null)}
          severity="error"
          messageKey="something_went_wrong"
          position={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Container>
    </ThemeProvider>
  );
}
