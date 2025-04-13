
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";
import { Bot } from "lucide-react";

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
    <section className="py-24 bg-gradient-to-b from-white to-[#f9f7f4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            {language === "en" ? (
              "Let's Make Salon Life Easier — Together"
            ) : (
              "Hãy Cùng Nhau Trải Nghiệm Emviapp"
            )}
          </h2>
          
          {language === "en" ? (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-primary/5 rounded-xl p-6 border border-primary/10 shadow-sm"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-xl font-medium text-center">
                    ✨ This part of the page is now managed by EmviApp's Smart Assistant.
                    <br />
                    You relax. We'll handle it from here.
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed font-serif text-gray-800">
                  Chúng tôi giúp bạn mang khách hàng đến tận tiệm.<br />
                  Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
                </p>
                
                <p className="text-xl font-medium text-primary mt-8 flex flex-col items-center">
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl">💡</span> Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —
                  </span>
                  <span>bạn chỉ cần tập trung vào điều mình yêu thích.</span>
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-700 text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              {language === "en" ? "EN / VI" : "VI / EN"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeTrustEmotionalSection;
