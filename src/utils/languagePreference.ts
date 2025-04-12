
/**
 * Gets the user's language preference from localStorage
 * @returns "en" | "vi" - The user's language preference
 */
export const getLanguagePreference = (): "en" | "vi" => {
  const storedLanguage = localStorage.getItem('emvi_language_preference');
  return (storedLanguage === 'vi' || storedLanguage === 'en') 
    ? storedLanguage as "en" | "vi" 
    : "en";
};

/**
 * Sets the user's language preference in localStorage and dispatches an event
 * @param language "en" | "vi" - The language to set
 */
export const setLanguagePreference = (language: "en" | "vi"): void => {
  localStorage.setItem('emvi_language_preference', language);
  
  // Dispatch a custom event to notify other components about the language change
  const event = new CustomEvent('languageChanged', {
    detail: { language }
  });
  window.dispatchEvent(event);
};

/**
 * Toggles the language between English and Vietnamese
 */
export const toggleLanguage = (): void => {
  const currentLanguage = getLanguagePreference();
  const newLanguage = currentLanguage === "en" ? "vi" : "en";
  setLanguagePreference(newLanguage);
};
