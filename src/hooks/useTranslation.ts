
import { useEffect, useState } from 'react';
import { getLanguagePreference, setLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

type Language = 'en' | 'vi';

export type Translation = {
  english: string;
  vietnamese: string;
} | string; // Allow string as a valid type for backward compatibility

export const useTranslation = () => {
  const [lang, setLang] = useState<Language>(getLanguagePreference());
  
  useEffect(() => {
    // Listen for language changes from other components
    const unsubscribe = addLanguageChangeListener((newLang) => {
      setLang(newLang);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  const t = (translation: Translation): string => {
    if (typeof translation === 'string') {
      return translation; // If a string is passed directly, just return it
    }
    
    if (lang === 'vi') {
      return translation.vietnamese;
    }
    return translation.english;
  };
  
  // Helper to detect if the current language is Vietnamese
  const isVietnamese = lang === 'vi';
  
  // Function to toggle between languages
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'vi' : 'en';
    setLanguagePreference(newLang);
    setLang(newLang);
  };
  
  return { 
    t, 
    lang, 
    isVietnamese, 
    toggleLanguage,
    setLanguage: (newLang: Language) => {
      setLanguagePreference(newLang);
      setLang(newLang);
    }
  };
};
