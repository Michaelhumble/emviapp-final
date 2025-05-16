
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ContentCard from "./ContentCard";
import LanguageToggleButton from "./LanguageToggleButton";
import { useTranslation } from "@/hooks/useTranslation";

const MissingPieceSection = () => {
  // Replace incorrect lang usage with isVietnamese
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Language toggle */}
          <div className="mb-8">
            <LanguageToggleButton 
              isVietnamese={isVietnamese} 
              toggleLanguage={toggleLanguage} 
            />
          </div>
          
          {/* Section title */}
          <SectionTitle 
            language={isVietnamese ? "vi" : "en"} 
            itemVariants={itemVariants} 
          />
          
          {/* Content card */}
          <ContentCard 
            language={isVietnamese ? "vi" : "en"} 
            itemVariants={itemVariants} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
