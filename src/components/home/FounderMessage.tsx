
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

Thank you for inspiring us every day. Together, we're making the beauty world more human.`,
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/15 via-pink-200/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-indigo-200/15 via-blue-200/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-20 left-1/4 text-yellow-300/40 animate-pulse text-2xl">✨</div>
        <div className="absolute top-32 right-1/3 text-purple-300/30 animate-pulse text-xl" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-1/3 text-pink-300/40 animate-pulse text-lg" style={{ animationDelay: '2.5s' }}>✨</div>
        <div className="absolute bottom-20 right-1/4 text-indigo-300/30 animate-pulse text-xl" style={{ animationDelay: '3.5s' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Title with Icon */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair flex items-center justify-center gap-4 relative group"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            role="heading"
            aria-level={2}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <IconComponent className="text-yellow-400" size={40} />
            </motion.div>
            {currentContent.title}
            
            {/* Animated underline */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full group-hover:scale-x-110 transition-transform duration-300"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)"
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </h2>
        </motion.div>

        {/* Main message card */}
        <motion.div 
          className="relative group max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glassmorphism card */}
          <div 
            className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl py-12 px-6 md:px-8 lg:px-12 border border-white/20 overflow-hidden group-hover:shadow-3xl transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(245, 158, 11, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-orange-400/20 p-[1px] group-hover:from-purple-400/40 group-hover:via-pink-300/40 group-hover:to-orange-400/40 transition-all duration-700">
              <div className="h-full w-full rounded-3xl bg-transparent" />
            </div>
            
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5 rounded-3xl" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
            
            <div className="relative z-10">
              {/* Message content */}
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8"
                role="article"
                aria-label="Founder's message"
              >
                <div className="text-lg md:text-xl leading-relaxed text-foreground font-inter font-medium">
                  {currentContent.message.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Signature */}
                <div className="pt-8 border-t border-white/20">
                  <p 
                    className="text-lg md:text-xl font-playfair italic"
                    style={{
                      color: 'rgba(139, 92, 246, 0.8)'
                    }}
                  >
                    {currentContent.signature}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
