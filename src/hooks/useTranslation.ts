
import { useState, useEffect } from 'react';
import { getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

export const useTranslation = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());
  const isVietnamese = language === "vi";
  
  useEffect(() => {
    const cleanup = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    return cleanup;
  }, []);
  
  const t = (enText: string, viText?: string) => {
    if (isVietnamese && viText) {
      return viText;
    }
    return enText;
  };
  
  return {
    language,
    isVietnamese,
    t
  };
};
