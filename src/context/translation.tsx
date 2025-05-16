
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

export type TranslationLanguage = 'english' | 'vietnamese';

interface TranslationContextType {
  language: TranslationLanguage;
  setLanguage: (language: TranslationLanguage) => void;
  t: (english: string, vietnamese: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<TranslationLanguage>(
    getLanguagePreference() === 'vi' ? 'vietnamese' : 'english'
  );

  useEffect(() => {
    const savedLanguage = getLanguagePreference();
    if (savedLanguage === 'vi') {
      setLanguageState('vietnamese');
    } else {
      setLanguageState('english');
    }
  }, []);

  const setLanguage = (newLanguage: TranslationLanguage) => {
    setLanguageState(newLanguage);
    setLanguagePreference(newLanguage === 'vietnamese' ? 'vi' : 'en');
  };

  // Translation function that returns either English or Vietnamese text based on current language
  const t = (english: string, vietnamese: string): string => {
    return language === 'vietnamese' ? vietnamese : english;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
