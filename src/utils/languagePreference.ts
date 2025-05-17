
// Language preference utilities

type Language = 'en' | 'vi';
type LanguageChangeListener = (language: Language) => void;

const LANGUAGE_KEY = 'emviapp-language';
const listeners: LanguageChangeListener[] = [];

// Default to English if no preference is set
export const getLanguagePreference = (): Language => {
  if (typeof localStorage === 'undefined') return 'en';
  
  const savedLang = localStorage.getItem(LANGUAGE_KEY);
  
  if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
    return savedLang;
  }
  
  // Try to detect browser language
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.substring(0, 2).toLowerCase();
    if (browserLang === 'vi') {
      return 'vi';
    }
  }
  
  return 'en';
};

export const setLanguagePreference = (language: Language): void => {
  if (typeof localStorage === 'undefined') return;
  
  localStorage.setItem(LANGUAGE_KEY, language);
  
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
  
  // Notify all listeners
  notifyListeners(language);
};

// Check if a language preference has been explicitly set
export const hasLanguagePreference = (): boolean => {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(LANGUAGE_KEY) !== null;
};

export const addLanguageChangeListener = (callback: LanguageChangeListener): (() => void) => {
  listeners.push(callback);
  
  // Return a function to remove the listener
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Private function to notify all listeners
const notifyListeners = (language: Language): void => {
  listeners.forEach(listener => listener(language));
};

// Initialize on load
if (typeof document !== 'undefined') {
  document.documentElement.lang = getLanguagePreference();
}
