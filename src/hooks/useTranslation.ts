
import { useCallback } from 'react';

export type TranslationKey = {
  english: string;
  vietnamese: string;
};

export function useTranslation() {
  // This is a simplified version. In a real app, this would depend on user preferences
  const language = 'english'; // Default to English for now
  
  const t = useCallback((key: TranslationKey): string => {
    return key[language as keyof TranslationKey] || key.english || '';
  }, []);

  return { t, language };
}
