
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
  
  return {
    ...context,
    isVietnamese
  };
};
