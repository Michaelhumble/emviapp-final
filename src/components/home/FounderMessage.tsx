
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
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Epic background with multiple layers */}
      <div className="absolute inset-0">
        {/* Premium gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800"></div>
        
        {/* Floating orbs with enhanced glow */}
        <div className="absolute top-1/6 left-1/5 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 via-pink-400/20 to-orange-400/15 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/6 right-1/5 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/25 via-indigo-400/20 to-purple-400/15 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated sparkle constellation */}
        <div className="absolute top-16 left-1/4 text-yellow-300/60 animate-pulse text-3xl transform hover:scale-125 transition-transform">✨</div>
        <div className="absolute top-24 right-1/3 text-purple-300/50 animate-pulse text-2xl transform hover:scale-125 transition-transform" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-40 left-1/3 text-pink-300/60 animate-pulse text-2xl transform hover:scale-125 transition-transform" style={{ animationDelay: '2.5s' }}>✨</div>
        <div className="absolute bottom-24 right-1/4 text-indigo-300/50 animate-pulse text-3xl transform hover:scale-125 transition-transform" style={{ animationDelay: '3.5s' }}>✨</div>
        <div className="absolute top-1/3 left-1/6 text-orange-300/40 animate-pulse text-xl transform hover:scale-125 transition-transform" style={{ animationDelay: '5s' }}>✨</div>
        <div className="absolute bottom-1/3 right-1/6 text-rose-300/50 animate-pulse text-2xl transform hover:scale-125 transition-transform" style={{ animationDelay: '6s' }}>✨</div>
        
        {/* Premium geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-purple-300/30 rounded-lg animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 right-10 w-20 h-20 border border-pink-300/25 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Billion-dollar title with enhanced effects */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-playfair flex items-center justify-center gap-6 relative group mb-6"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 15%, #d946ef 35%, #8b5cf6 55%, #ec4899 75%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '300% 100%',
              animation: 'shimmer 3s infinite',
            }}
            role="heading"
            aria-level={2}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
                filter: ['hue-rotate(0deg)', 'hue-rotate(45deg)', 'hue-rotate(0deg)']
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="drop-shadow-2xl"
            >
              <IconComponent className="text-yellow-400 drop-shadow-lg" size={64} />
            </motion.div>
            {currentContent.title}
            
            {/* Multi-layer animated underline */}
            <motion.div 
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 rounded-full group-hover:scale-x-110 transition-all duration-500"
              style={{
                width: "80%",
                background: "linear-gradient(90deg, #fbbf24 0%, #d946ef 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)"
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
              style={{
                width: "60%",
                background: "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 100%)",
                boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)"
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            />
          </h2>
        </motion.div>

        {/* Ultra-premium message card */}
        <motion.div 
          className="relative group max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse"></div>
          
          {/* Main luxury card */}
          <div 
            className="relative backdrop-blur-3xl rounded-[2.5rem] shadow-2xl py-16 px-8 md:px-12 lg:px-16 border overflow-hidden group-hover:shadow-4xl transition-all duration-700 transform group-hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(236, 72, 153, 0.08) 50%, rgba(245, 158, 11, 0.1) 75%, rgba(255,255,255,0.12) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.1),
                0 32px 64px -8px rgba(139, 92, 246, 0.25),
                0 16px 32px -8px rgba(236, 72, 153, 0.2),
                0 8px 16px -4px rgba(0,0,0,0.1),
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `
            }}
          >
            {/* Animated premium border */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] p-[2px] transition-all duration-700"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.3) 0%, rgba(139, 92, 246, 0.4) 25%, rgba(236, 72, 153, 0.4) 50%, rgba(245, 158, 11, 0.4) 75%, rgba(255,215,0,0.3) 100%)',
                backgroundSize: '300% 100%',
                animation: 'shimmer 4s infinite'
              }}
            >
              <div 
                className="h-full w-full rounded-[2.4rem]" 
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(236, 72, 153, 0.08) 50%, rgba(245, 158, 11, 0.1) 75%, rgba(255,255,255,0.12) 100%)',
                  backdropFilter: 'blur(40px)'
                }}
              />
            </div>
            
            {/* Premium texture overlay */}
            <div className="absolute inset-0 opacity-8 rounded-[2.5rem]" style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 1px, transparent 1px),
                radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px, 40px 40px, 50px 50px'
            }}></div>
            
            <div className="relative z-10">
              {/* Premium message content */}
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-10"
                role="article"
                aria-label="Founder's message"
              >
                <div className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-inter font-medium tracking-wide">
                  {currentContent.message.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className="mb-8 last:mb-0 text-white/90 group-hover:text-white transition-colors duration-500"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(139, 92, 246, 0.2)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                
                {/* Luxury signature */}
                <motion.div 
                  className="pt-12 border-t-2 border-gradient"
                  style={{
                    borderImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(139, 92, 246, 0.5) 50%, rgba(255,255,255,0.3) 80%, transparent 100%) 1'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p 
                    className="text-2xl md:text-3xl lg:text-4xl font-playfair italic font-bold tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #d946ef 50%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 4px 8px rgba(139, 92, 246, 0.3)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
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

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default FounderMessage;
