
import { useCallback, useEffect, useState } from 'react';

// Define language preference storage key
const LANGUAGE_PREFERENCE_KEY = 'emvi_language_preference';

// Define translation type
export type TranslationInput = string | { 
  english: string; 
  vietnamese: string; 
  defaultValue?: string;
} | { 
  count?: number;
  defaultValue?: string;
};

export const useTranslation = () => {
  // Get stored language preference or default to 'en'
  const getStoredLanguage = () => {
    if (typeof window === 'undefined') return 'en';
    
    const stored = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    return stored || 'en';
  };

  const [language, setLanguage] = useState(getStoredLanguage);

  // Update language preference
  const changeLanguage = useCallback((lang: 'en' | 'vi') => {
    setLanguage(lang);
    localStorage.setItem(LANGUAGE_PREFERENCE_KEY, lang);
  }, []);

  // Listen for language changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LANGUAGE_PREFERENCE_KEY) {
        setLanguage(e.newValue || 'en');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Translation function
  const t = useCallback((item: TranslationInput): string => {
    // Handle string input
    if (typeof item === 'string') {
      return item;
    }
    
    // Handle object with english/vietnamese properties
    if (item && 'english' in item && 'vietnamese' in item) {
      return language === 'vi' ? item.vietnamese : item.english;
    }
    
    // Handle count object
    if (item && 'count' in item) {
      return item.defaultValue || `${item.count || 0}`;
    }
    
    // Handle defaultValue object
    if (item && 'defaultValue' in item) {
      return item.defaultValue || '';
    }
    
    // Fallback for any other case
    return '';
  }, [language]);

  return {
    t,
    language,
    changeLanguage,
    isEnglish: language === 'en',
    isVietnamese: language === 'vi',
  };
};
