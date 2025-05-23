
import { useMemo } from 'react';
import { getLanguagePreference } from '@/utils/languagePreference';

export interface Translation {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  const currentLanguage = getLanguagePreference();

  const t = useMemo(() => {
    return (content: Translation) => {
      if (currentLanguage === 'vi') {
        return content.vietnamese;
      }
      return content.english;
    };
  }, [currentLanguage]);

  return { t };
};
