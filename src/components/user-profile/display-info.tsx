import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../types/user';

interface DisplayInfoProps {
  userData: Partial<User> | null;
}

export default function DisplayInfo({ userData }: DisplayInfoProps) {
  const { t } = useTranslation();

  return (
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
  );
}
