
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote, Clock, Layers } from "lucide-react";
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
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 via-purple-50/10 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-pink-100/40 to-yellow-100/40 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 shadow-sm mb-3"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  {language === "en" ? "From the Founder" : "Từ Người Sáng Lập"}
                </span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-12 -left-4 text-indigo-300 opacity-30">
              <Quote size={80} />
            </div>
            
            <div className="bg-white p-12 md:p-16 rounded-2xl shadow-xl border border-purple-100 relative z-10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-50 to-yellow-50 rounded-tr-full opacity-70"></div>
              
              <div className="relative">
                {language === "en" ? (
                  <div className="space-y-8 text-center">
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      Back then, we didn't have systems.<br />
                      We had a water bowl, a towel, and a dream.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Clock size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      No online bookings. No fancy tools. Just hustle, and heart.<br />
                      We walked to the store. We called friends for help.<br />
                      We made it work — even when nothing was working.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Layers size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      That's why EmviApp was born.<br />
                      To finally make things easier for the next generation —<br />
                      because we've already done the hard part.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8 text-center">
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      Ngày xưa, chúng tôi không có hệ thống gì cả.<br />
                      Chỉ có một thau nước, một cái khăn, và một giấc mơ.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Clock size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      Không có đặt lịch online. Không có phần mềm hiện đại.<br />
                      Chúng tôi tự đi mua đồ, gọi người quen đến phụ.<br />
                      Làm tất cả, dù chẳng có gì dễ dàng.
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Layers size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                      EmviApp ra đời là để giúp thế hệ sau nhẹ gánh hơn —<br />
                      Vì những điều khó khăn… chúng tôi đã trải qua rồi.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="absolute -bottom-4 -right-4 text-indigo-300 opacity-30 transform rotate-180">
                <Quote size={80} />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-indigo-200 rounded-full shadow-md text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors duration-300"
            >
              {language === "en" ? "Xem Tiếng Việt" : "View in English"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
