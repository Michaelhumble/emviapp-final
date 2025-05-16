
/**
 * Language preference utility
 * Provides functions to manage language preferences throughout the application
 */

type Language = 'en' | 'vi';

// Define listeners array for language change events
const listeners: Array<(lang: Language) => void> = [];

/**
 * Get the current language preference from localStorage or default to English
 */
export const getLanguagePreference = (): Language => {
  const savedPreference = localStorage.getItem('emvi_language_preference');
  return (savedPreference as Language) || 'en';
};

/**
 * Check if a language preference has been set
 */
export const hasLanguagePreference = (): boolean => {
  return localStorage.getItem('emvi_language_preference') !== null;
};

/**
 * Set language preference and notify all listeners
 */
export const setLanguagePreference = (language: Language): void => {
  localStorage.setItem('emvi_language_preference', language);
  
  // Notify all listeners about the language change
  listeners.forEach(listener => listener(language));
  
  // Also dispatch a custom event for components that might not have direct access to listeners
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language } 
  }));
};

/**
 * Toggle language between English and Vietnamese
 */
export const toggleLanguagePreference = (): Language => {
  const currentLanguage = getLanguagePreference();
  const newLanguage: Language = currentLanguage === 'en' ? 'vi' : 'en';
  setLanguagePreference(newLanguage);
  return newLanguage;
};

/**
 * Register a language change listener
 * Returns a function to remove the listener
 */
export const addLanguageChangeListener = (callback: (lang: Language) => void): (() => void) => {
  listeners.push(callback);
  
  // Return a function to remove this listener
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

/**
 * Get a translation for a key
 * @param translations Object with language keys and values
 * @param key The translation key to look up
 * @param fallback Optional fallback if translation is not found
 */
export const getTranslation = (
  translations: Record<string, Record<string, string>>, 
  key: string,
  fallback?: string
): string => {
  const lang = getLanguagePreference();
  return translations[lang]?.[key] || translations['en']?.[key] || fallback || key;
};
