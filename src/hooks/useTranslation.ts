
import { useState, useCallback } from 'react';

// Define a simple Translation type to avoid recursive type dependencies
export type Translation = {
  english: string;
  vietnamese: string;
};

export function useTranslation() {
  const [isVietnamese, setIsVietnamese] = useState(false);
  
  const toggleLanguage = useCallback(() => {
    setIsVietnamese(prev => !prev);
  }, []);
  
  // Updated translation function to handle both object and string arguments
  const t = useCallback((
    englishOrTranslation: string | Translation,
    vietnameseText?: string
  ): string => {
    // Handle case when called with Translation object
    if (typeof englishOrTranslation === 'object' && englishOrTranslation !== null) {
      return isVietnamese ? englishOrTranslation.vietnamese : englishOrTranslation.english;
    }
    
    // Handle case when called with separate strings
    if (typeof englishOrTranslation === 'string' && typeof vietnameseText === 'string') {
      return isVietnamese ? vietnameseText : englishOrTranslation;
    }
    
    // Fallback: return the first argument as is
    return typeof englishOrTranslation === 'string' ? englishOrTranslation : '';
  }, [isVietnamese]);
  
  return { isVietnamese, toggleLanguage, t };
}
