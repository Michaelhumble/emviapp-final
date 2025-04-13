
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";

const FounderMessage = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

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
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              A Personal Note
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-2 text-gray-800">
              From the Founder
            </h3>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg md:text-xl italic text-gray-700 mb-6 font-serif leading-relaxed text-center">
              "We started with just a water container, a dream, and a lot of hustle. This platform is for every artist who ever cleaned before sunrise, and every owner who paid themselves last."
            </p>
            
            {language === "vi" ? (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-base text-gray-600 font-medium leading-relaxed text-center">
                  Chúng Tôi Am Hiểu Sự Hy Sinh Của Bạn, Hãy Để A.I Thông Minh Giúp Mang Khách Đến Tận Nơi, Tìm Thợ, Quản Lý Tiệm Của Bạn Của Chính Bạn Chứ Không Phải Đối Thủ Bên Kia Đường Đối Diện Với Bạn.
                </p>
              </div>
            ) : (
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-500 italic text-center">
                  Every line of code we write is for your success.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
