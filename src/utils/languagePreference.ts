
// Language preference utilities

type Language = 'en' | 'vi';
type LanguageChangeListener = (language: Language) => void;

const LANGUAGE_KEY = 'emviapp-language';
const listeners: LanguageChangeListener[] = [];

// Default to English if no preference is set
export const getLanguagePreference = (): Language => {
  const savedLang = localStorage.getItem(LANGUAGE_KEY);
  
  if (savedLang && (savedLang === 'en' || savedLang === 'vi')) {
    return savedLang;
  }
  
  // Try to detect browser language
  const browserLang = navigator.language.substring(0, 2).toLowerCase();
  if (browserLang === 'vi') {
    return 'vi';
  }
  
  return 'en';
};

export const setLanguagePreference = (language: Language): void => {
  localStorage.setItem(LANGUAGE_KEY, language);
  document.documentElement.lang = language;
  
  // Notify all listeners
  notifyListeners(language);
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
