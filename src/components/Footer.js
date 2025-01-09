import React from 'react'
import { useTranslation} from 'react-i18next';


const Footer = () => {
  const { t } = useTranslation();
  const date = new Date();
  return (
    <footer>
      <p>&copy; Eric Johnson {t('media')} {date.getFullYear()}</p>
    </footer>    
  )
}

export default Footer