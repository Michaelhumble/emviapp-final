
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
                <p className="text-xl leading-relaxed font-serif text-gray-800">
                  We help bring customers straight to your salon.<br />
                  We help you find experienced technicians, send them irresistible offers, and manage your shop smoothly and efficiently — all in one place.
                </p>
                
                <p className="text-xl font-medium text-primary mt-8 flex flex-col items-center">
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl">💡</span> Let EmviApp's smart A.I. handle the heavy lifting —
                  </span>
                  <span>so you can focus on doing what you love and growing what's yours.</span>
                </p>
                
                <p className="text-xl font-semibold text-gray-800 mt-8">
                  If you don't use EmviApp...<br />
                  <span className="text-primary">Let's just say your competitors might beat you to it. <span className="text-2xl">😌</span></span><br />
                  <span className="text-gray-700">Try it now and feel the difference — instantly.</span>
                </p>
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
                  <span>bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.</span>
                </p>
                
                <p className="text-xl font-semibold text-gray-800 mt-8">
                  Nếu bạn không dùng thử EmviApp...<br />
                  <span className="text-primary">Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-2xl">😌</span></span><br />
                  <span className="text-gray-700">Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ.</span>
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
