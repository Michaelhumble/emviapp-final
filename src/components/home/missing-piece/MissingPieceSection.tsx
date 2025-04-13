
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
        }, 50);
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
    }, 50);
  };

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, // Reduced from 0.7 for faster animations
        staggerChildren: 0.15, // Reduced from 0.2 for faster animations
        delayChildren: 0.1 // Reduced from 0.3 for faster animations
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } // Reduced from 0.5 for faster animations
    }
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30">
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
            <SectionTitle 
              language={language} 
              itemVariants={itemVariants} 
            />
            
            <ContentCard 
              language={language} 
              itemVariants={itemVariants} 
            />
            
            <LanguageToggleButton 
              language={language}
              setLanguage={handleSetLanguage}
              itemVariants={itemVariants}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MissingPieceSection;
