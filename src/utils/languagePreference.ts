
/**
 * Utility functions for managing language preferences across components
 */

// Set the language preference
export const setLanguagePreference = (language: 'en' | 'vi') => {
  localStorage.setItem('emvi_language_preference', language);
  // Dispatch a custom event that other components can listen for
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language } 
  }));
};

// Get the current language preference
export const getLanguagePreference = (): 'en' | 'vi' => {
  const storedLanguage = localStorage.getItem('emvi_language_preference');
  return (storedLanguage === 'vi' || storedLanguage === 'en') 
    ? storedLanguage as 'en' | 'vi' 
    : 'en';
};

// Check if language preference has been set
export const hasLanguagePreference = (): boolean => {
  return localStorage.getItem('emvi_language_preference') !== null;
};

// Set the preferred language (alias for setLanguagePreference for consistency)
export const setPreferredLanguage = setLanguagePreference;

// Get the preferred language (alias for getLanguagePreference for consistency)
export const getPreferredLanguage = getLanguagePreference;

// Hook into language changes
export const addLanguageChangeListener = (
  callback: (language: 'en' | 'vi') => void
) => {
  const handleLanguageChange = (event: CustomEvent) => {
    if (event.detail && event.detail.language) {
      callback(event.detail.language);
    }
  };
  
  window.addEventListener('languageChanged', handleLanguageChange as EventListener);
  
  return () => {
    window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
  };
};
