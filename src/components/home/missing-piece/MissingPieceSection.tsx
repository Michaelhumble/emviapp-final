
import React from "react";
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

  // Sparkle animation keyframes
  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-orange-50/20" />
      
      {/* Animated sparkles */}
      <motion.div
        className="absolute top-20 left-1/4 text-yellow-400 text-2xl"
        variants={sparkleVariants}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/3 text-purple-400 text-xl"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/5 text-orange-400 text-lg"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants} 
        />
        
        <div className="relative">
          {/* Premium glassmorphism container */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(248,250,252,0.8) 100%)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" 
                 style={{ animationDuration: "3s" }} />
            
            <div className="relative py-16 px-8 md:px-16 lg:px-24">
              <ContentCard 
                language={isVietnamese ? "vi" : "en"} 
                itemVariants={itemVariants} 
              />
            </div>
          </motion.div>
          
          {/* Enhanced language toggle positioning */}
          <div className="absolute -bottom-6 right-6 z-20">
            <LanguageToggleButton
              isVietnamese={isVietnamese}
              toggleLanguage={toggleLanguage}
              className="shadow-lg backdrop-blur-md border border-white/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
