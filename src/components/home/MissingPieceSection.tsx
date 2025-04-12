
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const MissingPieceSection = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");

  // Listen for language change event
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              {language === "en" 
                ? "Find What You've Been Looking For — Right Now" 
                : "Tìm Thấy Những Gì Bạn Đang Tìm Kiếm — Ngay Bây Giờ"}
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === "en"
              ? "Connect with the people, places, and opportunities that will take your beauty career to the next level."
              : "Kết nối với những người, địa điểm và cơ hội sẽ đưa sự nghiệp làm đẹp của bạn lên một tầm cao mới."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
