
import { useState, useCallback } from 'react';

export type TranslationText = {
  english: string;
  vietnamese: string;
};

export function useTranslation() {
  const [isVietnamese, setIsVietnamese] = useState(false);
  
  const toggleLanguage = useCallback(() => {
    setIsVietnamese(prev => !prev);
  }, []);
  
  // Updated translation function that accepts either a string pair or an object with english/vietnamese properties
  const t = useCallback((text: string | TranslationText, fallbackText?: string): string => {
    // If text is an object with english/vietnamese properties
    if (typeof text === 'object' && text !== null && 'english' in text && 'vietnamese' in text) {
      return isVietnamese ? text.vietnamese : text.english;
    }
    
    // If text is a string (legacy format)
    return isVietnamese ? (fallbackText || text) : text;
  }, [isVietnamese]);
  
  return { isVietnamese, toggleLanguage, t };
}
