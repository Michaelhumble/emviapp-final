
import { useCallback } from 'react';

export const useTranslation = () => {
  // This is a simplified implementation
  // In a real app, you would handle language detection and switching
  
  const t = useCallback((english: string, vietnamese?: string) => {
    // For now, just return the English version
    // In a real implementation, this would check user preferences
    return english;
  }, []);
  
  return { t };
};
