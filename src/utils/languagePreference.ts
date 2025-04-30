
// Language preference management throughout the app

type Language = 'en' | 'vi';
type LanguageChangeListener = (language: Language) => void;

// Storage key for language preference
const LANGUAGE_PREFERENCE_KEY = 'emviapp_language';

// Default language if none is stored
const DEFAULT_LANGUAGE: Language = 'en';

// Event listeners for language changes
const listeners: LanguageChangeListener[] = [];

/**
 * Get the user's language preference from localStorage
 */
export const getLanguagePreference = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const savedPreference = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  return (savedPreference === 'en' || savedPreference === 'vi') 
    ? savedPreference 
    : DEFAULT_LANGUAGE;
};

/**
 * Check if the user has already set a language preference
 */
export const hasLanguagePreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const savedPreference = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  return savedPreference === 'en' || savedPreference === 'vi';
};

/**
 * Set the user's language preference in localStorage and notify listeners
 */
export const setLanguagePreference = (language: Language): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
  
  // Notify all listeners of the language change
  listeners.forEach(listener => listener(language));
};

/**
 * Add a listener for language changes
 * @returns A function that removes the listener
 */
export const addLanguageChangeListener = (listener: LanguageChangeListener): (() => void) => {
  listeners.push(listener);
  
  // Return function to remove this listener
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};
