import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { User } from '../../../types/user';

interface DisplayInfoProps {
  userData: Partial<User> | null;
}

export default function DisplayInfo({ userData }: DisplayInfoProps) {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      sx={{ mx: 0.5 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {t('name')}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {userData?.name}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="body2" color="text.secondary">
          {t('email')}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {userData?.email}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {t('phone')}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {userData?.phone}
        </Typography>
      </Box>
    </Box>
  );
}
