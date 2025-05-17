
import { useState, useEffect } from 'react';
import { getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

// Type for the translation dictionary
type TranslationDictionary = {
  [key: string]: string;
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

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || fallback || key;
  };

  return {
    t,
    language,
    setLanguage: (lang: "en" | "vi") => {
      setLanguage(lang);
    }
  };
};
