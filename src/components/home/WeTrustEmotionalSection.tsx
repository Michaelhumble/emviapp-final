
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
    <section className="py-16 bg-gradient-to-b from-white to-[#f9f7f4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {language === "en" ? (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed font-serif text-gray-800">
                  We help bring customers straight to your salon door.<br />
                  We help you find experienced nail techs.<br />
                  We help you offer deals they can't refuse.<br />
                  We help you manage your salon — smoothly and stress-free.
                </p>
                
                <p className="text-xl font-medium text-primary mt-8 flex flex-col items-center">
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl">💡</span> Let AI do all the heavy lifting —
                  </span>
                  <span>so you can focus on what you love.</span>
                </p>
                
                <p className="text-xl font-semibold text-gray-800 mt-8">
                  If you don't use EmviApp…<br />
                  <span className="text-primary">your competitors will. <span className="text-2xl">😌</span></span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed font-serif text-gray-800">
                  Chúng tôi giúp bạn mang khách hàng đến tận tiệm.<br />
                  Giúp bạn tìm những thợ giỏi, có kinh nghiệm.<br />
                  Giúp bạn đưa ra những ưu đãi hấp dẫn để thu hút khách.<br />
                  Giúp bạn quản lý tiệm thật suôn sẻ và đạt hiệu quả cao.
                </p>
                
                <p className="text-xl font-medium text-primary mt-8 flex flex-col items-center">
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl">💡</span> Hãy để A.I lo mọi thứ giùm bạn —
                  </span>
                  <span>bạn chỉ cần tập trung vào điều mình yêu thích.</span>
                </p>
                
                <p className="text-xl font-semibold text-gray-800 mt-8">
                  Nếu bạn không dùng thử EmviApp…<br />
                  <span className="text-primary">đối thủ của bạn sẽ dùng đấy. <span className="text-2xl">😌</span></span>
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
              {language === "en" ? "🇻🇳 Xem Tiếng Việt" : "🇺🇸 View in English"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeTrustEmotionalSection;
