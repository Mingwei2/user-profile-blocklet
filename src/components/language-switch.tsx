import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitchProps {
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export default function LanguageSwitch({ color = 'inherit' }: LanguageSwitchProps) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (lang?: string) => {
    setAnchorEl(null);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <>
      <IconButton onClick={handleLanguageClick} color={color}>
        <TranslateIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleLanguageClose()}>
        <MenuItem onClick={() => handleLanguageClose('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageClose('zh')}>中文</MenuItem>
      </Menu>
    </>
  );
}

LanguageSwitch.defaultProps = {
  color: 'inherit',
};
