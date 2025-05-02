
import { useState, useCallback } from 'react';

// Define a simple Translation type to avoid recursive type dependencies
export type Translation = {
  english: string;
  vietnamese: string;
};

export function useTranslation() {
  const [isVietnamese, setIsVietnamese] = useState(false);
  
  const toggleLanguage = useCallback(() => {
    setIsVietnamese(prev => !prev);
  }, []);
  
  // A simple translation function
  const t = useCallback((enText: string, viText: string): string => {
    return isVietnamese ? viText : enText;
  }, [isVietnamese]);
  
  return { isVietnamese, toggleLanguage, t };
}
