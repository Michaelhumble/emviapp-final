
import { useState, useEffect } from 'react';

type Language = 'en' | 'vi';

export function useTranslation() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    try {
      // Try to get language from localStorage if available
      const storedLang = localStorage.getItem('emviapp_language');
      if (storedLang && (storedLang === 'en' || storedLang === 'vi')) {
        setLang(storedLang as Language);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback to English if there's an error
      setLang('en');
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    try {
      setLang(newLang);
      // Store language preference
      localStorage.setItem('emviapp_language', newLang);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return { lang, setLanguage };
}
