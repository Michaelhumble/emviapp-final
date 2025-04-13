
/**
 * Gets the user's language preference from localStorage
 * Defaults to English if no preference is found
 */
export const getLanguagePreference = (): "en" | "vi" => {
  const storedLanguage = localStorage.getItem('emvi_language_preference');
  return (storedLanguage === 'vi' ? 'vi' : 'en');
};

/**
 * Sets the user's language preference in localStorage
 * and dispatches a languageChanged event
 */
export const setLanguagePreference = (language: "en" | "vi"): void => {
  localStorage.setItem('emvi_language_preference', language);
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language } 
  }));
};
