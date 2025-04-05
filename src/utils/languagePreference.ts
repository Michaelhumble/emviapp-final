
export const LANGUAGE_STORAGE_KEY = 'emviapp_preferred_language';

/**
 * Get the user's preferred language from localStorage or default to 'en'
 */
export const getPreferredLanguage = (): string => {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
};

/**
 * Set the user's preferred language in localStorage
 */
export const setPreferredLanguage = (language: string): void => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

/**
 * Check if the user has already set a language preference
 */
export const hasLanguagePreference = (): boolean => {
  return !!localStorage.getItem(LANGUAGE_STORAGE_KEY);
};

/**
 * Clear the user's language preference from localStorage
 */
export const clearLanguagePreference = (): void => {
  localStorage.removeItem(LANGUAGE_STORAGE_KEY);
};
