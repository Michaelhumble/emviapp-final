
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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50/30"></div>
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 via-pink-50/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-50/20 via-blue-50/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Refined title */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair flex items-center justify-center gap-4 relative group mb-4"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            role="heading"
            aria-level={2}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <IconComponent className="text-purple-500" size={48} />
            </motion.div>
            {currentContent.title}
          </h2>
          
          {/* Clean underline */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Premium message card */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Elegant card */}
          <div 
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl py-12 px-8 md:px-12 lg:px-16 border border-white/50 group-hover:shadow-2xl transition-all duration-500"
            style={{
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(139, 92, 246, 0.08)'
            }}
          >
            {/* Subtle border accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 p-[1px]">
              <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-xl" />
            </div>
            
            <div className="relative z-10">
              {/* Message content */}
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8"
                role="article"
                aria-label="Founder's message"
              >
                <div className="text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-700 font-inter font-medium">
                  {currentContent.message.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className="mb-8 last:mb-0"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                
                {/* Refined signature */}
                <motion.div 
                  className="pt-10 border-t border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p 
                    className="text-xl md:text-2xl font-playfair italic font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {currentContent.signature}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
