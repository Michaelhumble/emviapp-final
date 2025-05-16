
import { useState, useEffect } from 'react';

export type Translation = {
  english: string;
  vietnamese: string;
} | {
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

  // Function to translate text based on current language - supports both strings and Translation objects
  const t = (englishOrObj: string | Translation, vietnamese?: string): string => {
    // If first argument is a string and second argument is provided, use them directly
    if (typeof englishOrObj === 'string' && typeof vietnamese === 'string') {
      return language === 'en' ? englishOrObj : vietnamese;
    }
    
    // If first argument is a Translation object
    if (typeof englishOrObj === 'object') {
      if ('english' in englishOrObj && 'vietnamese' in englishOrObj) {
        return language === 'en' ? englishOrObj.english : englishOrObj.vietnamese;
      }
      
      if ('en' in englishOrObj && 'vi' in englishOrObj) {
        return language === 'en' ? englishOrObj.en : englishOrObj.vi;
      }
    }
    
    // Fallback: just return the first argument as string
    return String(englishOrObj);
  };

  // Function to translate an object with English and Vietnamese fields
  const translateObj = (obj: Translation): string => {
    if ('en' in obj && 'vi' in obj) {
      return language === 'en' ? obj.en : obj.vi;
    }
    
    if ('english' in obj && 'vietnamese' in obj) {
      return language === 'en' ? obj.english : obj.vietnamese;
    }
    
    return String(obj);
  };

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'vi' : 'en'));
  };

  // Set language explicitly
  const setTranslationLanguage = (lang: TranslationLanguage) => {
    setLanguage(lang);
  };

  // Add isVietnamese getter for convenience
  const isVietnamese = language === 'vi';

  return {
    t,
    translateObj,
    language,
    toggleLanguage,
    setLanguage: setTranslationLanguage,
    isVietnamese
  };
};
