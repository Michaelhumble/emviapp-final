
import { useState, useEffect } from 'react';

export type Language = 'en' | 'vi';

// Create a simple translation function
type TranslationFunction = (key: string) => string;
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common translations
    "Top Artists Near You": "Top Artists Near You",
    "View top-rated freelancers and rising stars in your area.": "View top-rated freelancers and rising stars in your area.",
    "No artists found in your area yet": "No artists found in your area yet",
    "Check back soon as our network grows!": "Check back soon as our network grows!",
    "View all top artists in your area": "View all top artists in your area"
    // Add more translations as needed
  },
  vi: {
    // Vietnamese translations
    "Top Artists Near You": "Nghệ Sĩ Hàng Đầu Gần Bạn",
    "View top-rated freelancers and rising stars in your area.": "Xem những nghệ sĩ được đánh giá cao và ngôi sao mới nổi trong khu vực của bạn.",
    "No artists found in your area yet": "Chưa tìm thấy nghệ sĩ nào trong khu vực của bạn",
    "Check back soon as our network grows!": "Hãy quay lại sớm khi mạng lưới của chúng tôi phát triển!",
    "View all top artists in your area": "Xem tất cả nghệ sĩ hàng đầu trong khu vực của bạn"
    // Add more translations as needed
  }
};

export function useTranslation() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    try {
      // Try to get language from localStorage if available
      const storedLang = localStorage.getItem('emviapp_language');
      if (storedLang && (storedLang === 'en' || storedLang === 'vi')) {
        setLang(storedLang as Language);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback to English if there's an error
      setLang('en');
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    try {
      setLang(newLang);
      // Store language preference
      localStorage.setItem('emviapp_language', newLang);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  // Translation function
  const t: TranslationFunction = (key) => {
    return translations[lang]?.[key] || key;
  };

  return { lang, setLanguage, t };
}
