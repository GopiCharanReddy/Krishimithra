import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationML from './locales/ml/translation.json';
import translationTE from './locales/te/translation.json';
import translationTA from './locales/ta/translation.json';
import translationKN from './locales/kn/translation.json';

const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
  ml: { translation: translationML },
  te: { translation: translationTE },
  ta: { translation: translationTA },
  kn: { translation: translationKN }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
