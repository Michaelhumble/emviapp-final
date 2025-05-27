
interface TranslationOptions {
  english: string;
  vietnamese: string;
}

export type Translation = TranslationOptions;

export const useTranslation = () => {
  const isVietnamese = false; // For now, always return false - can be enhanced later
  
  const t = (options: TranslationOptions) => {
    // For now, always return English
    return options.english;
  };

  const toggleLanguage = () => {
    // Placeholder function for language toggle
    console.log('Language toggle not implemented yet');
  };

  return { 
    t, 
    isVietnamese, 
    toggleLanguage 
  };
};
