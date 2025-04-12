
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";

const WeTrustEmotionalSection = () => {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {language === "en" ? (
                "We're thankful for every tool that helped the industry grow"
              ) : (
                "Chúng tôi biết ơn mọi công cụ đã giúp ngành công nghiệp phát triển"
              )}
            </h2>
            
            <p className="text-lg text-gray-700 mb-4">
              {language === "en" ? (
                "But something was still missing."
              ) : (
                "Nhưng vẫn còn thiếu một điều gì đó."
              )}
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              {language === "en" ? (
                "Most of those tools weren't built by people who carried water containers to do pedicures."
              ) : (
                "Hầu hết những công cụ đó không được tạo ra bởi những người từng xách nước để làm dịch vụ pedicure."
              )}
            </p>
            
            <p className="mb-4">
              {language === "en" ? (
                "They weren't built by the ones who opened the salon and cleaned the floors before clients arrived."
              ) : (
                "Họ không phải là những người mở tiệm sớm và lau dọn sàn nhà trước khi khách đến."
              )}
            </p>
            
            <p className="mb-6">
              {language === "en" ? (
                "They weren't built by owners who paid their staff first… and themselves last."
              ) : (
                "Họ không phải là những chủ tiệm trả lương cho nhân viên trước... và bản thân họ nhận sau cùng."
              )}
            </p>
            
            <p className="font-semibold">
              {language === "en" ? (
                "That's why we built EmviApp — not to replace what exists, but to complete what's been missing."
              ) : (
                "Đó là lý do chúng tôi xây dựng EmviApp — không phải để thay thế những gì đã có, mà để hoàn thiện những gì còn thiếu."
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeTrustEmotionalSection;
