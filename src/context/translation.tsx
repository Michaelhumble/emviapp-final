
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';
import { Translation } from '@/hooks/useTranslation';

export type TranslationLanguage = 'english' | 'vietnamese';

interface TranslationContextType {
  language: TranslationLanguage;
  setLanguage: (language: TranslationLanguage) => void;
  t: (english: string | Translation, vietnamese?: string) => string;
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

  // Enhanced translation function that handles both object and dual-string format
  const t = (englishOrObj: string | Translation, vietnamese?: string): string => {
    // If it's the dual string format (legacy)
    if (typeof englishOrObj === 'string' && vietnamese !== undefined) {
      return language === 'vietnamese' ? vietnamese : englishOrObj;
    }
    
    // If it's an object with english/vietnamese properties
    if (typeof englishOrObj === 'object' && englishOrObj !== null && 'english' in englishOrObj && 'vietnamese' in englishOrObj) {
      return language === 'vietnamese' ? englishOrObj.vietnamese : englishOrObj.english;
    }
    
    // If it's just a single string
    if (typeof englishOrObj === 'string') {
      return englishOrObj;
    }
    
    // Fallback for invalid input
    return String(englishOrObj);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
