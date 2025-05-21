import { useCallback } from 'react';

export type TranslatableContent = string | { english: string; vietnamese: string };

// For compatibility with components expecting this format
export type Translation = { english: string; vietnamese: string };

export const useTranslation = () => {
  // This would normally check user preferences or browser settings
  // For now, we'll default to English
  const currentLanguage = 'english'; // or 'vietnamese'

  const t = useCallback((content: TranslatableContent): string => {
    if (!content) return '';
    
    // If content is a string, return it directly
    if (typeof content === 'string') return content;
    
    // Otherwise, get the appropriate translation
    return content[currentLanguage as keyof typeof content] || content.english;
  }, []);

  const isVietnamese = currentLanguage === 'vietnamese';

  return { t, isVietnamese };
};

export default useTranslation;
