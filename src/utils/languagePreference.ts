
// Language preference utility

/**
 * Get the user's language preference from local storage
 * @returns The language preference ('en' or 'vi')
 */
export const getLanguagePreference = (): string => {
  return localStorage.getItem('language') || 'en';
};

/**
 * Set the user's language preference in local storage
 * @param lang The language preference to set ('en' or 'vi')
 */
export const setLanguagePreference = (lang: string): void => {
  localStorage.setItem('language', lang);
  
  // Dispatch a custom event so other components can react to the language change
  window.dispatchEvent(
    new CustomEvent('languageChanged', { detail: { language: lang } })
  );
};

/**
 * Toggle the language preference between English and Vietnamese
 */
export const toggleLanguagePreference = (): void => {
  const currentLang = getLanguagePreference();
  const newLang = currentLang === 'en' ? 'vi' : 'en';
  setLanguagePreference(newLang);
};

/**
 * Check if the current language preference is Vietnamese
 * @returns True if the language preference is Vietnamese
 */
export const isVietnameseLanguage = (): boolean => {
  return getLanguagePreference() === 'vi';
};
