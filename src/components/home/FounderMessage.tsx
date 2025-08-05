
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars } from "lucide-react";
import { getLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

const FounderMessage = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const content = {
    en: {
      title: "Founder's Message",
      message: `To everyone who believes beauty changes lives:

We see your hard work, your late nights, and the silent sacrifices no one else understands.

We know the dreams you carry and the pressure you feel—to make people look and feel their best, to build a better future for your family.

EmviApp exists because you deserve more: more recognition, more respect, more real opportunity.

This is your community—a place to be seen, supported, and celebrated.

Thank you for making life more beautiful. Together, we're changing the beauty industry—starting with love and sincerity.`,
      signature: "— The EmviApp Team",
      icon: Sparkles
    },
    vi: {
      title: "Thông điệp Người sáng lập",
      message: `Gửi đến những người làm đẹp bằng cả trái tim:

EmviApp hiểu nỗi vất vả, nỗi lo, và cả những ước mơ thầm lặng của bạn.

Chúng tôi biết cảm giác mệt mỏi, những hy sinh vì gia đình, vì khách hàng, vì một ngày mai tốt đẹp hơn.

EmviApp ra đời để bạn không còn phải tự mình cố gắng—ở đây, bạn được lắng nghe, tôn trọng và nâng đỡ.

Cộng đồng này là chỗ dựa, là nơi bạn thực sự thuộc về.

Cảm ơn bạn đã làm đẹp cho cuộc sống này.
Chúng ta cùng nhau thay đổi ngành làm đẹp, bắt đầu từ sự yêu thương và chân thành.`,
      signature: "— Đội ngũ EmviApp",
      icon: Stars
    }
  };

  const currentContent = content[language];
  const IconComponent = currentContent.icon;

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-orange-50/30 via-pink-50/20 to-purple-50/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-transparent to-purple-100/30"></div>
      <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-tl from-purple-400/10 to-indigo-400/10 rounded-full filter blur-3xl"></div>
      
      {/* Enhanced floating sparkles */}
      <div className="absolute top-20 left-1/4 text-yellow-500 text-2xl animate-pulse">✨</div>
      <div className="absolute top-32 right-1/3 text-purple-500 text-xl animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-32 left-1/3 text-pink-500 text-lg animate-pulse" style={{ animationDelay: '2.5s' }}>💫</div>
      <div className="absolute bottom-20 right-1/4 text-indigo-500 text-xl animate-pulse" style={{ animationDelay: '3.5s' }}>✨</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <IconComponent className="text-white" size={28} />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              {currentContent.title}
            </h2>
            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">💜</span>
            </div>
          </div>
          
          {/* Gradient underline */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.div>

        {/* Blog-inspired message card */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Premium card with gradient border */}
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl h-full w-full"></div>
            </div>
            
            {/* Content card */}
            <div className="relative bg-white rounded-3xl p-12 md:p-16 lg:p-20 shadow-2xl">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Message content with enhanced typography */}
                <div className="text-xl md:text-2xl leading-relaxed text-gray-800 space-y-6">
                  {currentContent.message.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className="text-center leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                
                {/* Enhanced signature section */}
                <motion.div 
                  className="pt-8 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="text-2xl font-bold text-center bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {currentContent.signature}
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-orange-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-indigo-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </motion.div>

        {/* Additional CTA section */}
        <motion.div 
          className="mt-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'vi' ? '💖 Cảm ơn bạn đã tin tưởng EmviApp' : '💖 Thank You for Trusting EmviApp'}
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              {language === 'vi' 
                ? 'Chúng tôi cam kết xây dựng một cộng đồng làm đẹp mạnh mẽ, nơi mọi người được tôn trọng và thành công cùng nhau.'
                : 'We are committed to building a strong beauty community where everyone is respected and succeeds together.'
              }
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F"
                className="inline-block"
              >
                <div className="bg-white text-purple-900 hover:bg-gray-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <span className="flex items-center justify-center">
                    <span className="mr-3">
                      {language === 'vi' ? '🌟 Tham Gia Cộng Đồng' : '🌟 Join Our Community'}
                    </span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
