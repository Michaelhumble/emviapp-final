
import { useState, useCallback } from 'react';

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
