
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

const ClientGrowthSecretSection = () => {
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
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-purple-50/10 to-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-tr from-pink-100/40 to-yellow-100/40 rounded-full blur-3xl opacity-70"></div>
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
                <Lock size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  {language === "en" ? "The Secret Behind Every Busy Salon" : "Bí Quyết Đằng Sau Mỗi Tiệm Luôn Đông Khách"}
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
            <div className="bg-white p-12 md:p-16 rounded-2xl shadow-xl border border-purple-100 relative z-10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full opacity-70"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-50 to-yellow-50 rounded-tr-full opacity-70"></div>
              
              <div className="relative">
                {language === "en" ? (
                  <div className="space-y-8 text-center">
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      In a world of constant promotions and discounts, most salon owners miss the fundamental truth:
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Sparkles size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      <span className="font-bold">The most profitable salons aren't the ones with the most followers.<br />
                      They're the ones with the most <em>returners</em>.</span>
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Lock size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      We don't offer 100 deals for 1 client.<br />
                      <span className="font-bold">We offer 1 deal to 100 clients — effortlessly.</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8 text-center">
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      Trong thế giới của những chương trình khuyến mãi và giảm giá liên tục, hầu hết các chủ salon bỏ lỡ sự thật cơ bản:
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Sparkles size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      <span className="font-bold">Những salon có lợi nhuận cao nhất không phải là những salon có nhiều người theo dõi nhất.<br />
                      Mà là những salon có nhiều khách hàng <em>quay lại</em> nhất.</span>
                    </p>
                    
                    <div className="flex items-center justify-center gap-3 my-10">
                      <hr className="w-16 border-t-2 border-indigo-200" />
                      <Lock size={20} className="text-indigo-400" />
                      <hr className="w-16 border-t-2 border-indigo-200" />
                    </div>
                    
                    <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed">
                      Chúng tôi không cung cấp 100 ưu đãi cho 1 khách hàng.<br />
                      <span className="font-bold">Chúng tôi cung cấp 1 ưu đãi cho 100 khách hàng — một cách dễ dàng.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button 
              className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 group px-8 py-6 text-lg"
              size="lg"
              asChild
            >
              <Link to="/pricing">
                {language === "en" ? "I'm Ready To Take Control" : "Tôi Sẵn Sàng Làm Chủ Tiệm Của Mình"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
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

export default ClientGrowthSecretSection;
