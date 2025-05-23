
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "./LanguageToggleButton";
import ContentCard from "./ContentCard";
import SectionTitle from "./SectionTitle";

const MissingPieceSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Define motion variants that will be passed to child components
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants} 
        />
        <div className="relative">
          <motion.div
            className="relative rounded-3xl shadow-xl overflow-hidden"
            style={{
              backgroundImage: "url('/images/home/missing-piece-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative py-12 px-6 md:px-12 lg:px-24 text-white">
              <ContentCard 
                language={isVietnamese ? "vi" : "en"} 
                itemVariants={itemVariants} 
              />
            </div>
          </motion.div>
          <div className="absolute bottom-4 right-4">
            <LanguageToggleButton
              isVietnamese={isVietnamese}
              toggleLanguage={toggleLanguage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
