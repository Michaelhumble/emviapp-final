
import { useState, useEffect } from 'react';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';

export interface Translation {
  english: string;
  vietnamese: string;
}

export function useTranslation() {
  const [language, setLanguage] = useState<string>(getLanguagePreference());
  
  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Toggle between English and Vietnamese
  const toggleLanguage = () => {
    const newLanguage = language === 'vi' ? 'en' : 'vi';
    setLanguagePreference(newLanguage as 'en' | 'vi');
    setLanguage(newLanguage);
  };
  
  // The t function now accepts either a string or a Translation object
  const t = (key: string | Translation): string => {
    // If it's a simple string, try to map it to common UI elements
    if (typeof key === 'string') {
      // Map common UI elements
      const commonTranslations: Record<string, Translation> = {
        "Home": { english: "Home", vietnamese: "Trang chủ" },
        "Jobs": { english: "Jobs", vietnamese: "Việc làm" },
        "Salons": { english: "Salons", vietnamese: "Tiệm Nail" },
        "Artists": { english: "Artists", vietnamese: "Nghệ sĩ" },
        "About": { english: "About", vietnamese: "Giới thiệu" },
        "Contact": { english: "Contact", vietnamese: "Liên hệ" },
        "Post a Job": { english: "Post a Job", vietnamese: "Đăng tin tuyển dụng" },
        "Post a Job for Free": { english: "Post a Job for Free", vietnamese: "Đăng tin miễn phí" },
        "Select language": { english: "Select language", vietnamese: "Chọn ngôn ngữ" },
        "Inspired by Sunshine ☀️": { english: "Inspired by Sunshine ☀️", vietnamese: "Lấy cảm hứng từ Sunshine ☀️" },
        "Sign In": { english: "Sign In", vietnamese: "Đăng nhập" },
        "Sign Out": { english: "Sign Out", vietnamese: "Đăng xuất" },
        "Sign Up": { english: "Sign Up", vietnamese: "Đăng ký" },
        "Dashboard": { english: "Dashboard", vietnamese: "Bảng điều khiển" },
        "Profile": { english: "Profile", vietnamese: "Hồ sơ" },
        "Salon Name": { english: "Salon Name", vietnamese: "Tên Tiệm" },
        "Beautiful Connections, Beautiful Business": { english: "Beautiful Connections, Beautiful Business", vietnamese: "Kết Nối Đẹp, Kinh Doanh Thịnh Vượng" },
        "Community": { english: "Community", vietnamese: "Cộng Đồng" },
        "Innovation": { english: "Innovation", vietnamese: "Đổi Mới" },
        "Excellence": { english: "Excellence", vietnamese: "Xuất Sắc" },
        "Celebration": { english: "Celebration", vietnamese: "Tôn Vinh" },
        "Trust": { english: "Trust", vietnamese: "Tin Cậy" },
        "Our Values": { english: "Our Values", vietnamese: "Giá Trị Của Chúng Tôi" },
        "Our Mission": { english: "Our Mission", vietnamese: "Sứ Mệnh Của Chúng Tôi" },
        "Our Journey": { english: "Our Journey", vietnamese: "Hành Trình Của Chúng Tôi" },
        "What Makes Us Different": { english: "What Makes Us Different", vietnamese: "Điều Làm Chúng Tôi Khác Biệt" },
        "Cultural Understanding": { english: "Cultural Understanding", vietnamese: "Hiểu Biết Văn Hóa" },
        "Community First": { english: "Community First", vietnamese: "Cộng Đồng Là Trên Hết" },
        "Authentic Representation": { english: "Authentic Representation", vietnamese: "Đại Diện Chân Thật" },
        "Fair and Transparent": { english: "Fair and Transparent", vietnamese: "Công Bằng và Minh Bạch" },
        "Start Your Journey with EmviApp": { english: "Start Your Journey with EmviApp", vietnamese: "Bắt Đầu Hành Trình Với EmviApp" },
        "Thank You, Emvi": { english: "Thank You, Emvi", vietnamese: "Cảm Ơn, Emvi" },
        "Inspired by Sunshine": { english: "Inspired by Sunshine", vietnamese: "Lấy Cảm Hứng Từ Ánh Nắng" }
      };
      
      if (commonTranslations[key]) {
        return language === 'vi' ? commonTranslations[key].vietnamese : commonTranslations[key].english;
      }
      
      // If no mapping found, return the key itself
      return key;
    }
    
    // If it's a Translation object, return the appropriate translation based on the language
    if (key && typeof key === 'object' && 'english' in key && 'vietnamese' in key) {
      return language === 'vi' ? key.vietnamese : key.english;
    }
    
    // Fallback - shouldn't happen if types are correct
    return typeof key === 'string' ? key : '';
  };
  
  // Add a convenience property to check if Vietnamese is active
  const isVietnamese = language === 'vi';
  
  return { t, isVietnamese, toggleLanguage };
}
