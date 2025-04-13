
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

/**
 * Checks if the user has set a language preference
 * @returns boolean - Whether the user has set a language preference
 */
export const hasLanguagePreference = (): boolean => {
  const storedLanguage = localStorage.getItem('emvi_language_preference');
  return storedLanguage === 'vi' || storedLanguage === 'en';
};

/**
 * Adds a listener for language change events
 * @param callback - Function to call when the language changes
 * @returns function to remove the listener
 */
export const addLanguageChangeListener = (callback: (language: "en" | "vi") => void): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (customEvent.detail && customEvent.detail.language) {
      callback(customEvent.detail.language);
    }
  };
  
  window.addEventListener('languageChanged', handler);
  
  // Return a function to remove the listener
  return () => {
    window.removeEventListener('languageChanged', handler);
  };
};
