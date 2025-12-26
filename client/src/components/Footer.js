import React, { memo } from 'react'
import { useTranslation} from 'react-i18next';

// Memoize the year to avoid creating new Date on every render
const currentYear = new Date().getFullYear();

const Footer = memo(() => {
  const { t } = useTranslation();
  
  return (
    <footer>
      <p>&copy; Eric Johnson {t('media')} {currentYear}</p>
    </footer>    
  )
});

Footer.displayName = 'Footer';

export default Footer