import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
                We help bring customers to your door.<br />
                We help you find the right nail technicians, offer them what they can't refuse, and keep your salon running like a dream.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <span className="inline-flex items-center text-primary font-medium">
                  <span className="mr-2">💡</span> No more juggling. No more tech headaches.
                </span><br />
                Let our smart AI handle the heavy lifting — you just focus on doing what you love.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 text-center font-medium">
                Because if you don't use EmviApp...<br />
                Your competition across the street will. <span className="text-xl">😌</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                Chúng tôi giúp bạn mang khách hàng đến tận tiệm.<br />
                Giúp bạn tìm thợ giỏi, đưa ra ưu đãi không ai từ chối được, và quản lý tiệm thật mượt mà.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-6 text-center">
                <span className="inline-flex items-center text-primary font-medium">
                  <span className="mr-2">💡</span> Không còn đau đầu với công nghệ.
                </span><br />
                Hãy để A.I lo mọi thứ — bạn chỉ cần tập trung làm điều mình yêu thích.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-6 text-center font-medium">
                Vì nếu bạn không dùng EmviApp...<br />
                Tiệm đối diện chắc chắn sẽ dùng. <span className="text-xl">😌</span>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
