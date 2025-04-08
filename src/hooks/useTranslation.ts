
// Simple translation hook to handle i18n
export function useTranslation() {
  // For now, just return the text as-is, later can be expanded
  // to support multiple languages
  const t = (text: string) => text;
  
  return { t };
}
