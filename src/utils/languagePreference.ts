
// Local storage key for language preference
const LANGUAGE_PREFERENCE_KEY = 'emviapp_language_preference';

/**
 * Get the user's preferred language from localStorage
 * @returns The preferred language code ('en', 'vi') or null if not set
 */
export const getPreferredLanguage = (): string | null => {
  return localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
};

/**
 * Check if the user has set a language preference
 * @returns True if a language preference is set, false otherwise
 */
export const hasLanguagePreference = (): boolean => {
  return !!getPreferredLanguage();
};

/**
 * Set the user's preferred language in localStorage
 * @param language Language code to set ('en', 'vi')
 */
export const setPreferredLanguage = (language: string): void => {
  localStorage.setItem(LANGUAGE_PREFERENCE_KEY, language);
};

/**
 * Clear the user's language preference from localStorage
 */
export const clearLanguagePreference = (): void => {
  localStorage.removeItem(LANGUAGE_PREFERENCE_KEY);
};
