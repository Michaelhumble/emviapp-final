
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
    <section className="py-16 bg-[#F9F7F4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-6">
            {language === "en" ? (
              <span className="inline-block px-4 py-1 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-4">
                From the Founder
              </span>
            ) : (
              <span className="inline-block px-4 py-1 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-4">
                Từ Người Sáng Lập
              </span>
            )}
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            {language === "en" ? (
              <div className="space-y-6">
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  "We started with just a water container, a dream, and a lot of hustle.<br />
                  This platform is for every artist who cleaned before sunrise,<br />
                  and every owner who paid themselves last.
                </p>
                
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  If you've come this far without help —<br />
                  you already did the hardest part.
                </p>
                
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  Now we're giving you a system that takes care of the rest."
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  "Chúng tôi bắt đầu chỉ với một thau nước, một ước mơ, và rất nhiều cố gắng.<br />
                  Nền tảng này là dành cho mọi người thợ từng lau dọn tiệm trước khi trời sáng,<br />
                  và mọi chủ tiệm từng trả lương cho nhân viên trước — rồi mới đến lượt mình.
                </p>
                
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  Nếu bạn đã đi đến đây mà không ai giúp —<br />
                  thì phần khó nhất bạn đã vượt qua rồi.
                </p>
                
                <p className="text-lg md:text-xl italic text-gray-700 font-serif leading-relaxed text-center">
                  Bây giờ, chúng tôi mang đến một hệ thống lo hết phần còn lại cho bạn."
                </p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  const newLanguage = language === "en" ? "vi" : "en";
                  setLanguage(newLanguage);
                  localStorage.setItem('emvi_language_preference', newLanguage);
                  window.dispatchEvent(new CustomEvent('languageChanged', { 
                    detail: { language: newLanguage } 
                  }));
                }}
                className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-600 text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                {language === "en" ? "🇻🇳 Xem Tiếng Việt" : "🇺🇸 View in English"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
