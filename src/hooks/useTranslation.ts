
import { useState, useEffect } from 'react';
import { getLanguagePreference } from '@/utils/languagePreference';

export interface Translation {
  english: string;
  vietnamese: string;
}

export function useTranslation() {
  const [language, setLanguage] = useState<string>(getLanguagePreference());
  
  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // The t function now accepts either a string or a Translation object
  const t = (key: string | Translation): string => {
    // If it's a simple string, return it as is (for backward compatibility)
    if (typeof key === 'string') {
      return key;
    }
    
    // If it's a Translation object, return the appropriate translation based on the language
    if (key && typeof key === 'object' && 'english' in key && 'vietnamese' in key) {
      return language === 'vi' ? key.vietnamese : key.english;
    }
    
    // Fallback - shouldn't happen if types are correct
    return typeof key === 'string' ? key : '';
  };
  
  // Add a convenience property to check if Vietnamese is active
  const isVietnamese = language === 'vi';
  
  return { t, isVietnamese };
}
