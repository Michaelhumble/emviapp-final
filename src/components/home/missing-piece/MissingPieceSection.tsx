
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";
import DecorativeBackground from "../sections/DecorativeBackground";
import SectionTitle from "./SectionTitle";
import ContentCard from "./ContentCard";
import LanguageToggleButton from "./LanguageToggleButton";

const MissingPieceSection = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setIsChangingLanguage(true);
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setLanguage(event.detail.language);
          setIsChangingLanguage(false);
        }, 100);
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

  const handleSetLanguage = (newLanguage: "en" | "vi") => {
    if (newLanguage === language) return;
    
    setIsChangingLanguage(true);
    setTimeout(() => {
      setLanguage(newLanguage);
      setIsChangingLanguage(false);
    }, 100);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.25 }
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30">
      <div className="absolute inset-0 opacity-60">
        <DecorativeBackground />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={language} // Force re-render when language changes
            initial="hidden"
            animate={isChangingLanguage ? "hidden" : "visible"}
            exit="hidden"
            variants={variants}
            className="max-w-5xl mx-auto"
          >
            {/* Dynamic header based on language */}
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight relative inline-block">
                {language === "en" ? (
                  "Let's Experience EmviApp Together"
                ) : (
                  "Hãy Cùng Nhau Trải Nghiệm EmviApp"
                )}
                <span className="absolute -top-6 -right-8 text-2xl">✨</span>
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-purple-500 mt-4 rounded-full"></div>
              </h2>
            </motion.div>

            {/* First content card: Your Business/Kinh Doanh */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100/50"
              variants={itemVariants}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-violet-600 mb-4 font-serif">
                {language === "en" ? (
                  "Your Business, Supercharged"
                ) : (
                  "Kinh Doanh Của Bạn, Được Nâng Cấp"
                )}
              </h3>
              
              <p className="text-gray-700 text-lg">
                {language === "en" ? (
                  "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution."
                ) : (
                  "Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao."
                )}
              </p>
            </motion.div>

            {/* Second content card: AI content with icon */}
            <motion.div
              className="bg-purple-50 rounded-3xl shadow-md p-6 sm:p-8 mb-8 border border-indigo-100/50 flex gap-6 items-center"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <img 
                  src="/lovable-uploads/abbf3393-89b0-4cf3-974e-9004bf6486ff.png"
                  alt="AI Icon"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-violet-700 text-lg font-medium">
                {language === "en" ? (
                  "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business."
                ) : (
                  "Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình."
                )}
              </p>
            </motion.div>

            {/* Third content card: Reminder/warning block */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-12 border border-indigo-100/50"
              variants={itemVariants}
            >
              <p className="text-lg">
                <span className="text-pink-500 font-medium">
                  {language === "en" ? (
                    "Without EmviApp, you might be missing out on opportunities"
                  ) : (
                    "Nếu bạn không dùng thử EmviApp..."
                  )}
                </span>{" "}
                {language === "en" ? (
                  "that your competitors are already embracing."
                ) : (
                  "Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc."
                )}
                {" 😔"}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <a 
                href="/sign-up" 
                className="group inline-flex items-center justify-center px-8 py-4 text-white bg-violet-600 hover:bg-violet-700 rounded-full font-medium text-lg shadow-md transition-all duration-300"
              >
                {language === "en" ? (
                  <>
                    Try it now and experience the difference 
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                ) : (
                  <>
                    Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </a>
            </motion.div>

            {/* Language toggle button */}
            <motion.div
              className="mt-12 flex justify-center"
              variants={itemVariants}
            >
              <button
                onClick={() => handleSetLanguage(language === "en" ? "vi" : "en")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <span className="text-sm font-medium">
                  {language === "en" ? "Chuyển sang tiếng Việt" : "Switch to English"}
                </span>
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                  {language === "en" ? "🇻🇳" : "🇺🇸"}
                </span>
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MissingPieceSection;
