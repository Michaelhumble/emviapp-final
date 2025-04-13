
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";
import { Sparkles, ArrowRight } from "lucide-react";
import DecorativeBackground from "./sections/DecorativeBackground";

const MissingPieceSection = () => {
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

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30">
      <div className="absolute inset-0 opacity-60">
        <DecorativeBackground />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants}
          className="max-w-5xl mx-auto"
        >
          {/* Title with animated underline and sparkle effect */}
          <motion.div 
            className="text-center mb-14"
            variants={itemVariants}
          >
            <div className="inline-block relative">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600">
                {language === "en" ? (
                  "Let's Experience EmviApp Together"
                ) : (
                  "Hãy Cùng Nhau Trải Nghiệm Emviapp"
                )}
              </h2>
              <motion.div 
                className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%", x: "-50%" }}
                whileInView={{ width: "60%", x: "-50%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.div 
                className="absolute -top-7 -right-10 text-yellow-400"
                animate={{ 
                  rotate: [0, 20, 0, -20, 0],
                  scale: [1, 1.2, 1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3
                }}
              >
                <Sparkles size={32} className="text-yellow-400 drop-shadow-md" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Main content card with premium styling */}
          <motion.div 
            className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-indigo-100/50 relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
            
            {/* Content based on language */}
            {language === "en" ? (
              <>
                <motion.div 
                  className="text-center mb-10" 
                  variants={itemVariants}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
                    <span className="bg-indigo-50 px-4 py-1 rounded-lg">Your Business, Supercharged</span>
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    <span className="font-semibold text-indigo-600">We help bring customers straight to your salon.</span>{" "}
                    Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-10 border border-indigo-100/50 shadow-inner"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-md">
                      <Sparkles size={48} className="text-indigo-600" />
                    </div>
                    <p className="text-xl text-gray-700 text-center md:text-left">
                      <span className="font-semibold">EmviApp's intelligent AI handles the complex work —</span><br />
                      so you can focus on your passion and growing your business.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center" 
                  variants={itemVariants}
                >
                  <p className="text-xl text-gray-800 font-medium mb-8">
                    Without EmviApp, you might be missing out on opportunities<br />
                    that your competitors are already embracing. <span className="text-2xl">😌</span>
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Try it now and experience the difference
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={20} className="text-white" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div 
                  className="text-center mb-10" 
                  variants={itemVariants}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
                    <span className="bg-indigo-50 px-4 py-1 rounded-lg">Kinh Doanh Của Bạn, Được Nâng Cấp</span>
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    <span className="font-semibold text-indigo-600">Chúng tôi giúp bạn mang khách hàng đến tận tiệm.</span>{" "}
                    Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-10 border border-indigo-100/50 shadow-inner"
                  variants={itemVariants}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-md">
                      <Sparkles size={48} className="text-indigo-600" />
                    </div>
                    <p className="text-xl text-gray-700 text-center md:text-left">
                      <span className="font-semibold">Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —</span><br />
                      bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="text-center" 
                  variants={itemVariants}
                >
                  <p className="text-xl text-gray-800 font-medium mb-8">
                    Nếu bạn không dùng thử EmviApp...<br />
                    Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-2xl">😌</span>
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight size={20} className="text-white" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
          
          {/* Enhanced language toggle with animation */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-white shadow-lg text-gray-700 text-sm font-medium border border-indigo-100 hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
            >
              <span className="text-indigo-700">{language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
