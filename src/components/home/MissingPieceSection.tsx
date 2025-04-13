
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {language === "en" ? (
            <>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <strong>We help bring customers straight to your salon.</strong><br />
                We help you find experienced technicians, send them irresistible offers, and manage your shop smoothly and efficiently — all in one place.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <span className="inline-flex items-center text-primary font-medium">
                  <span className="mr-2">💡</span>
                </span><br />
                Let EmviApp's smart A.I. handle the heavy lifting —<br />
                so you can focus on doing what you love and growing what's yours.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 text-center font-medium">
                If you don't use EmviApp...<br />
                Let's just say your competitors might beat you to it. <span className="text-xl">😌</span><br />
                Try it now and feel the difference — instantly.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <strong>Chúng tôi giúp bạn mang khách hàng đến tận tiệm.</strong><br />
                Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <span className="inline-flex items-center text-primary font-medium">
                  <span className="mr-2">💡</span>
                </span><br />
                Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —<br />
                bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 text-center font-medium">
                Nếu bạn không dùng thử EmviApp...<br />
                Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-xl">😌</span><br />
                Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
