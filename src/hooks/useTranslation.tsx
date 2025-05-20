
import { useCallback } from 'react';

interface TranslationOptions {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  // In a real implementation, this would check the user's language preference
  const currentLanguage = 'english';

  const t = useCallback((options: TranslationOptions): string => {
    return options[currentLanguage as keyof TranslationOptions] || options.english;
  }, [currentLanguage]);

  return { t };
};
