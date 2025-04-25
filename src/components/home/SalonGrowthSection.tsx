
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";
import DecorativeBackground from "@/components/home/sections/DecorativeBackground";

const SalonGrowthSection = () => {
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

  const questionAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 }
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-gray-50 via-purple-50/10 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <DecorativeBackground />
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
                  {language === "en" ? "Client Growth System" : "Hệ Thống Phát Triển Khách Hàng"}
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
                <h2 className="text-3xl md:text-4xl font-playfair text-center mb-10 leading-tight">
                  {language === "en" ? (
                    "What's Really Keeping Your Salon From Growing?"
                  ) : (
                    "Điều Gì Đang Âm Thầm Kìm Hãm Sự Phát Triển Của Tiệm Bạn?"
                  )}
                </h2>
                
                {language === "en" ? (
                  <div className="space-y-8 text-center">
                    {/* Reflective Questions */}
                    <motion.div 
                      className="space-y-3"
                      initial={questionAnimation.initial}
                      whileInView={questionAnimation.animate}
                      transition={questionAnimation.transition}
                      viewport={{ once: true }}
                    >
                      <p className="text-lg text-gray-700">How do you manage your client list?</p>
                      <p className="text-lg text-gray-700">Do you even have one?</p>
                      <p className="text-lg text-gray-700">When an artist leaves… how many clients leave with them?</p>
                      <p className="text-lg text-gray-700">Why are some salons always full, while yours feels unpredictable?</p>
                    </motion.div>
                    
                    {/* Reveal Truth */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-xl text-gray-800 font-serif leading-relaxed italic">
                        The smartest salons don't chase clients — they keep them loyal through control of their client list.
                      </p>
                    </motion.div>

                    {/* Bold Key Line */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="py-4"
                    >
                      <p className="text-lg text-gray-700">👉 We don't offer 100 deals for 1 client.</p>
                      <p className="text-2xl font-bold text-indigo-700 font-playfair mt-2">
                        We offer 1 deal to 100 clients — effortlessly.
                      </p>
                    </motion.div>
                    
                    {/* Present EmviApp */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-lg text-gray-700 leading-relaxed">
                        EmviApp's Client Growth System gives you the power to retain, grow, and protect your clients — so no artist or competitor can take them away.
                      </p>
                    </motion.div>
                    
                    {/* Exclusivity */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="pt-4"
                    >
                      <p className="text-lg text-gray-700 font-medium">This system is reserved for those ready to take control.</p>
                      <p className="flex items-center justify-center gap-2 text-indigo-600 font-medium mt-2">
                        <Lock size={16} />
                        <span>Included in select premium plans.</span>
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-8 text-center">
                    {/* Vietnamese Content - Reflective Questions */}
                    <motion.div 
                      className="space-y-3"
                      initial={questionAnimation.initial}
                      whileInView={questionAnimation.animate}
                      transition={questionAnimation.transition}
                      viewport={{ once: true }}
                    >
                      <p className="text-lg text-gray-700">Bạn quản lý danh sách khách hàng như thế nào?</p>
                      <p className="text-lg text-gray-700">Bạn có danh sách khách hàng không?</p>
                      <p className="text-lg text-gray-700">Khi một nghệ sĩ rời đi… bao nhiêu khách hàng rời đi cùng họ?</p>
                      <p className="text-lg text-gray-700">Tại sao một số tiệm luôn đông khách, trong khi tiệm của bạn lại không ổn định?</p>
                    </motion.div>
                    
                    {/* Reveal Truth */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-xl text-gray-800 font-serif leading-relaxed italic">
                        Những tiệm thông minh nhất không đuổi theo khách hàng — họ giữ khách trung thành thông qua việc kiểm soát danh sách khách hàng.
                      </p>
                    </motion.div>

                    {/* Bold Key Line */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="py-4"
                    >
                      <p className="text-lg text-gray-700">👉 Chúng tôi không cung cấp 100 ưu đãi cho 1 khách hàng.</p>
                      <p className="text-2xl font-bold text-indigo-700 font-playfair mt-2">
                        Chúng tôi cung cấp 1 ưu đãi cho 100 khách hàng — một cách dễ dàng.
                      </p>
                    </motion.div>
                    
                    {/* Present EmviApp */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Hệ thống Phát triển Khách hàng của EmviApp cho bạn sức mạnh để giữ chân, phát triển và bảo vệ khách hàng — không một nghệ sĩ hay đối thủ nào có thể lấy đi khách hàng của bạn.
                      </p>
                    </motion.div>
                    
                    {/* Exclusivity */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="pt-4"
                    >
                      <p className="text-lg text-gray-700 font-medium">Hệ thống này dành riêng cho những người sẵn sàng làm chủ.</p>
                      <p className="flex items-center justify-center gap-2 text-indigo-600 font-medium mt-2">
                        <Lock size={16} />
                        <span>Được bao gồm trong các gói premium.</span>
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center"
          >
            <Button 
              className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 group text-white px-6 py-6 h-auto text-lg"
              asChild
            >
              <Link to="/pricing">
                {language === "en" ? "I'm Ready To Control My Growth" : "Tôi Sẵn Sàng Làm Chủ Sự Phát Triển"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {/* Language Toggle */}
            <button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white border border-indigo-200 rounded-full shadow-md text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition-colors duration-300"
            >
              {language === "en" ? "Xem Tiếng Việt" : "View in English"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SalonGrowthSection;
