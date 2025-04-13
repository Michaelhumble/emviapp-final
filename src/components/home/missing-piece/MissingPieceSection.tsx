
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";
import DecorativeBackground from "../sections/DecorativeBackground";
import SectionTitle from "./SectionTitle";
import ContentCard from "./ContentCard";
import LanguageToggleButton from "./LanguageToggleButton";

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
            setLanguage={setLanguage}
            itemVariants={itemVariants}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
