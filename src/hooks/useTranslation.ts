
// Simple translation hook to handle i18n
export function useTranslation() {
  // For now, just return the text as-is, later can be expanded
  // to support multiple languages
  const t = (text: string | { english: string, vietnamese: string }) => {
    if (typeof text === 'string') {
      return text;
    }
    
    // If it's an object with language variants, return english for now
    // This can be expanded later to respect user language preferences
    return text.english;
  };
  
  return { t };
}
