
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";

const MissingPieceSection = () => {
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            {language === "en" ? (
              "Let's Experience EmviApp Together"
            ) : (
              "Hãy Cùng Nhau Trải Nghiệm Emviapp"
            )}
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            {language === "en" ? (
              <>
                <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
                  <strong className="text-indigo-600">We help bring customers straight to your salon.</strong><br />
                  We help you find experienced technicians, send them irresistible offers, and manage your shop smoothly and efficiently — all in one place.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
                  <p className="text-lg md:text-xl text-gray-700 mb-2 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full text-indigo-600 font-bold mb-2">
                      💡
                    </span>
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 text-center">
                    Let EmviApp's smart A.I. handle the heavy lifting —<br />
                    so you can focus on doing what you love and growing what's yours.
                  </p>
                </div>
                <p className="text-lg md:text-xl text-gray-800 text-center font-medium">
                  If you don't use EmviApp...<br />
                  Let's just say your competitors might beat you to it. <span className="text-xl">😌</span><br />
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full inline-block mt-4 hover:bg-indigo-700 transition-colors">
                    Try it now and feel the difference — instantly.
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
                  <strong className="text-indigo-600">Chúng tôi giúp bạn mang khách hàng đến tận tiệm.</strong><br />
                  Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
                  <p className="text-lg md:text-xl text-gray-700 mb-2 text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full text-indigo-600 font-bold mb-2">
                      💡
                    </span>
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 text-center">
                    Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —<br />
                    bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
                  </p>
                </div>
                <p className="text-lg md:text-xl text-gray-800 text-center font-medium">
                  Nếu bạn không dùng thử EmviApp...<br />
                  Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-xl">😌</span><br />
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full inline-block mt-4 hover:bg-indigo-700 transition-colors">
                    Hãy cùng nhau trải nghiệm những điều thú vị — ngay bây giờ.
                  </span>
                </p>
              </>
            )}
          </div>
          
          {/* Language Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              className="px-4 py-2 rounded-full bg-white shadow-md text-gray-700 text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{language === "en" ? "🇺🇸" : "🇻🇳"}</span>
              <span>{language === "en" ? "EN / VI" : "VI / EN"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
