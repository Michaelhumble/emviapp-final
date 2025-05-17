
import { useState, useEffect } from 'react';
import { getLanguagePreference, setLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

// Type for the translation dictionary
type TranslationDictionary = {
  [key: string]: string;
};

// Type for translation input
export type TranslationInput = string | {
  english: string;
  vietnamese: string;
};

// Translation dictionaries
const translations: Record<string, TranslationDictionary> = {
  en: {
    "join_now": "Join Now",
    "learn_more": "Learn More",
    "contact_us": "Contact Us",
    "sign_up": "Sign Up",
    "login": "Login",
    "search": "Search",
    "about_us": "About Us",
    "home": "Home",
    // Add more translations as needed
  },
  vi: {
    "join_now": "Tham Gia Ngay",
    "learn_more": "Tìm Hiểu Thêm",
    "contact_us": "Liên Hệ",
    "sign_up": "Đăng Ký",
    "login": "Đăng Nhập",
    "search": "Tìm Kiếm",
    "about_us": "Về Chúng Tôi",
    "home": "Trang Chủ",
    // Add more translations as needed
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<"en" | "vi">(
    getLanguagePreference() as "en" | "vi"
  );

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLang) => {
      setLanguage(newLang as "en" | "vi");
    });
    
    return removeListener;
  }, []);

  // Translation function that handles both string keys and direct translations
  const t = (input: TranslationInput, fallback?: string): string => {
    // Handle object-based translations
    if (typeof input === 'object' && 'english' in input && 'vietnamese' in input) {
      return language === 'vi' ? input.vietnamese : input.english;
    }
    
    // Handle string key lookups from dictionary
    if (typeof input === 'string') {
      const dict = translations[language] || translations.en;
      return dict[input] || fallback || input;
    }
    
    // Fallback
    return fallback || '';
  };

  return {
    t,
    language,
    isVietnamese: language === 'vi',
    setLanguage: (lang: "en" | "vi") => {
      setLanguage(lang);
      setLanguagePreference(lang);
    },
    toggleLanguage: () => {
      const newLang = language === 'en' ? 'vi' : 'en';
      setLanguage(newLang);
      setLanguagePreference(newLang);
    }
  };
};
