import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../types/user';

interface EditFormProps {
  tempData: Partial<User> | null;
  formErrors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditForm({ tempData, formErrors, handleInputChange }: EditFormProps) {
  const { t } = useTranslation();

  return (
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
  );
}
