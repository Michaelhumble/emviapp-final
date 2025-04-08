
import { useCallback } from 'react';
import { useAuth } from '@/context/auth';

type TranslationObject = {
  english: string;
  vietnamese: string;
};

export const useTranslation = () => {
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || 'English';

  const t = useCallback((key: string | TranslationObject): string => {
    // If we're passed a translation object directly
    if (typeof key === 'object' && key !== null) {
      return preferredLanguage === 'Vietnamese' ? key.vietnamese : key.english;
    }
    
    // If we're passed a string key (to be implemented with backend translations)
    return key;
  }, [preferredLanguage]);

  return { t };
};
