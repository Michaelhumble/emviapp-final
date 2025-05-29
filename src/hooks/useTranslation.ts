
import { useMemo } from 'react';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

export interface Translation {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  const currentLanguage = getLanguagePreference();
  const isVietnamese = currentLanguage === 'vi';

  const t = useMemo(() => {
    return (content: Translation | string) => {
      // Handle string inputs by creating a Translation object
      if (typeof content === 'string') {
        return content;
      }
      
      if (currentLanguage === 'vi') {
        return content.vietnamese;
      }
      return content.english;
    };
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
    setLanguagePreference(newLanguage);
    window.location.reload(); // Simple refresh to apply language change
  };

  return { 
    t, 
    isVietnamese,
    toggleLanguage,
    currentLanguage 
  };
};
