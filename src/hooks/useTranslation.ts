
import { useContext } from 'react';
import { TranslationContext, TranslationLanguage } from '@/context/translation';

export interface Translation {
  english: string;
  vietnamese: string;
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  // Add isVietnamese helper
  const isVietnamese = context.language === 'vietnamese';
  
  // Add toggleLanguage function
  const toggleLanguage = () => {
    context.setLanguage(isVietnamese ? 'english' : 'vietnamese');
  };
  
  // Update the t function to accept both string and object formats
  const t = (textOrObj: string | Translation): string => {
    if (typeof textOrObj === 'string') {
      // For backwards compatibility with direct string usage
      return textOrObj;
    }
    
    // If an object with english/vietnamese props is provided
    if (textOrObj && typeof textOrObj === 'object' && 'english' in textOrObj && 'vietnamese' in textOrObj) {
      return context.language === 'vietnamese' ? textOrObj.vietnamese : textOrObj.english;
    }
    
    // Fallback for invalid input
    return String(textOrObj);
  };
  
  // Legacy support function that creates Translation object from separate strings
  const legacyT = (english: string, vietnamese: string): string => {
    return t({ english, vietnamese });
  };
  
  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t,
    legacyT,
    isVietnamese,
    toggleLanguage
  };
};
