
type Language = "en" | "vi";
type LanguageChangeListener = (language: Language) => void;

const LANGUAGE_PREFERENCE_KEY = 'emvi_language';
let listeners: LanguageChangeListener[] = [];

export const getLanguagePreference = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }
  
  const savedPreference = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  return savedPreference === 'vi' ? 'vi' : 'en';
};

export const setLanguagePreference = (language: Language): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
  
  // Notify all listeners
  listeners.forEach(listener => listener(language));
};

export const addLanguageChangeListener = (listener: LanguageChangeListener): () => void => {
  listeners.push(listener);
  
  // Return a function to remove this listener
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};
