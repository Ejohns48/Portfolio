import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector  from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','es','fr'],
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'en',
    detection: {
      order: ['cookie','htmlTag','localStorage','subdomain'],
      caches: ['cookie'],
    }
  });

  export default i18n;