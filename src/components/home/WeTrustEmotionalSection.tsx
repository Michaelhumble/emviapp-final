
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
