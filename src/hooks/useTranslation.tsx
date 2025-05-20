
import { useCallback, useState } from 'react';

interface TranslationOptions {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  // In a real implementation, this would be based on user settings
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'vietnamese'>('english');
  
  const isVietnamese = currentLanguage === 'vietnamese';

  const t = useCallback((options: TranslationOptions): string => {
    return options[currentLanguage] || options.english;
  }, [currentLanguage]);

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(currentLanguage === 'english' ? 'vietnamese' : 'english');
  }, [currentLanguage]);

  return { t, currentLanguage, setCurrentLanguage, isVietnamese, toggleLanguage };
};
