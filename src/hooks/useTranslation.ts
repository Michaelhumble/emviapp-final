
import { getLanguagePreference } from "@/utils/languagePreference";

type Translation = {
  english: string;
  vietnamese: string;
};

export const useTranslation = () => {
  const lang = getLanguagePreference();
  
  const t = (translation: Translation): string => {
    if (lang === 'vi') {
      return translation.vietnamese;
    }
    return translation.english;
  };
  
  return { t, lang };
};
