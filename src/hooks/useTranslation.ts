
import { getLanguagePreference } from "@/utils/languagePreference";

type Language = 'en' | 'vi';

export type Translation = {
  english: string;
  vietnamese: string;
} | string; // Allow string as a valid type for backward compatibility

export const useTranslation = () => {
  const lang = getLanguagePreference();
  
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
  
  return { t, lang, isVietnamese };
};
