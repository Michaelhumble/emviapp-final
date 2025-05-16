
import { useState, useEffect } from 'react';

export type Translation = {
  en: string;
  vi: string;
};

type TranslationLanguage = 'en' | 'vi';

export interface TranslationOptions {
  defaultLanguage?: TranslationLanguage;
  userPreference?: TranslationLanguage;
}

export const useTranslation = (options?: TranslationOptions) => {
  const [language, setLanguage] = useState<TranslationLanguage>(
    options?.userPreference || options?.defaultLanguage || 'en'
  );

  // Function to translate text based on current language
  const t = (english: string, vietnamese: string): string => {
    return language === 'en' ? english : vietnamese;
  };

  // Function to translate an object with English and Vietnamese fields
  const translateObj = (obj: Translation): string => {
    return language === 'en' ? obj.en : obj.vi;
  };

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'vi' : 'en'));
  };

  // Set language explicitly
  const setTranslationLanguage = (lang: TranslationLanguage) => {
    setLanguage(lang);
  };

  return {
    t,
    translateObj,
    language,
    toggleLanguage,
    setLanguage: setTranslationLanguage
  };
};
