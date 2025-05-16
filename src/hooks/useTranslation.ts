
import { useState, useCallback, useEffect } from 'react';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

// Define a simple Translation type to avoid recursive type dependencies
export type Translation = {
  english: string;
  vietnamese: string;
};

export function useTranslation() {
  const [isVietnamese, setIsVietnamese] = useState(getLanguagePreference() === 'vi');
  
  useEffect(() => {
    // Initialize language from local preference
    setIsVietnamese(getLanguagePreference() === 'vi');
    
    // Listen for language changes from other components
    const handleLanguageChange = (e: CustomEvent) => {
      setIsVietnamese(e.detail.language === 'vi');
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  const toggleLanguage = useCallback(() => {
    const newLanguage = isVietnamese ? 'en' : 'vi';
    setLanguagePreference(newLanguage);
    setIsVietnamese(!isVietnamese);
  }, [isVietnamese]);
  
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
