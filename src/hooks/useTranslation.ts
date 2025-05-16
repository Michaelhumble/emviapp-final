
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
  
  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t,
    isVietnamese
  };
};
