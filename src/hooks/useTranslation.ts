
import { useState, useEffect } from 'react';
import { getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

type TranslationObject = {
  en: string;
  vi: string;
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());
  const isVietnamese = language === "vi";
  
  useEffect(() => {
    const cleanup = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    return cleanup;
  }, []);
  
  const t = (enText: string | TranslationObject, viText?: string) => {
    if (typeof enText === 'object') {
      return isVietnamese ? enText.vi : enText.en;
    }
    
    if (isVietnamese && viText) {
      return viText;
    }
    
    return enText;
  };
  
  return {
    language,
    isVietnamese,
    t,
    setLanguage
  };
};

export type { TranslationObject };
