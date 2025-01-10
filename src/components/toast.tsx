import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  severity: 'success' | 'error';
  messageKey: string;
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export default function Toast({
  open,
  onClose,
  severity,
  messageKey,
  position = { vertical: 'bottom', horizontal: 'right' },
}: ToastProps) {
  const { t } = useTranslation();

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={position}>
      <Alert severity={severity} onClose={onClose}>
        {t(messageKey)}
      </Alert>
    </Snackbar>
  );
}

Toast.defaultProps = {
  position: { vertical: 'bottom', horizontal: 'right' },
};
