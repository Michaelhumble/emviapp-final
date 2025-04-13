
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

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
    <section className="py-20 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 text-sm font-medium text-primary/80 bg-primary/5 rounded-full mb-2">
              {language === "en" ? "From the Founder" : "Từ Người Sáng Lập"}
            </span>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            {language === "en" ? (
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  Back then, we didn't have systems.<br />
                  We had a water bowl, a towel, and a dream.
                </p>
                
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  No online bookings. No fancy tools. Just hustle, and heart.<br />
                  We walked to the store. We called friends for help.<br />
                  We made it work — even when nothing was working.
                </p>
                
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  That's why EmviApp was born.<br />
                  To finally make things easier for the next generation —<br />
                  because we've already done the hard part.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  Ngày xưa, chúng tôi không có hệ thống gì cả.<br />
                  Chỉ có một thau nước, một cái khăn, và một giấc mơ.
                </p>
                
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  Không có đặt lịch online. Không có phần mềm hiện đại.<br />
                  Chúng tôi tự đi mua đồ, gọi người quen đến phụ.<br />
                  Làm tất cả, dù chẳng có gì dễ dàng.
                </p>
                
                <p className="text-lg md:text-xl text-gray-700 font-serif leading-relaxed text-center">
                  EmviApp ra đời là để giúp thế hệ sau nhẹ gánh hơn —<br />
                  Vì những điều khó khăn… chúng tôi đã trải qua rồi.
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
                {language === "en" ? "Xem Tiếng Việt" : "View in English"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
