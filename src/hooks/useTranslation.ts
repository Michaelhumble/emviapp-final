
import { useCallback } from 'react';

type TranslatableContent = {
  english: string;
  vietnamese: string;
};

export const useTranslation = () => {
  // This would normally check user preferences or browser settings
  // For now, we'll default to English
  const currentLanguage = 'english'; // or 'vietnamese'

  const t = useCallback((content: TranslatableContent): string => {
    if (!content) return '';
    return content[currentLanguage as keyof TranslatableContent] || content.english;
  }, []);

  return { t };
};

export default useTranslation;
