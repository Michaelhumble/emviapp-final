
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
  
  // Updated translation function to handle various formats of arguments
  const t = useCallback((
    textOrTranslation: string | Translation | { english: string; vietnamese: string }
  ): string => {
    // Handle case when called with Translation object
    if (typeof textOrTranslation === 'object' && textOrTranslation !== null) {
      return isVietnamese ? textOrTranslation.vietnamese : textOrTranslation.english;
    }
    
    // Default case: string input returns as is
    return typeof textOrTranslation === 'string' ? textOrTranslation : '';
  }, [isVietnamese]);
  
  return { isVietnamese, toggleLanguage, t };
}
