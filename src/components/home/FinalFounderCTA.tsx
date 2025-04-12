
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const FinalFounderCTA = () => {
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
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <Heart className="h-10 w-10 text-red-500" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {language === "en" 
              ? "This is the system we all needed" 
              : "Đây là hệ thống mà tất cả chúng ta đều cần"}
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            {language === "en" 
              ? "One platform, for everyone — built by the industry, for the industry." 
              : "Một nền tảng, cho tất cả mọi người — được xây dựng bởi ngành, cho ngành."}
          </p>
          
          <Link to="/auth/signup">
            <Button size="lg" className="font-medium px-8 py-6 text-base">
              {language === "en" ? "Join Our Community Today" : "Tham Gia Cộng Đồng Của Chúng Tôi Ngay Hôm Nay"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalFounderCTA;
