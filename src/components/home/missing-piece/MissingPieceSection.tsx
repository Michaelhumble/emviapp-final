
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "./LanguageToggleButton";
import ContentCard from "./ContentCard";
import SectionTitle from "./SectionTitle";

const MissingPieceSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Enhanced motion variants for luxury feel
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Refined sparkle animation
  const sparkleVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.4, 1, 0.4],
      rotate: [0, 180, 360],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-50/40 via-white to-purple-50/20">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-6">
        <div className="absolute top-1/4 left-8 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-8 w-60 h-60 bg-gradient-to-tl from-amber-400/10 to-orange-400/10 rounded-full blur-3xl" />
      </div>
      
      {/* Elegant floating sparkles */}
      <motion.div
        className="absolute top-24 left-1/4 text-purple-400 text-lg opacity-50"
        variants={sparkleVariants}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-32 right-1/3 text-amber-400 text-base opacity-50"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/5 text-pink-400 text-lg opacity-50"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants} 
        />
        
        <div className="relative max-w-6xl mx-auto">
          {/* Redesigned compact premium container */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 50%, rgba(248,250,252,0.96) 100%)",
              boxShadow: "0 32px 64px -12px rgba(139,92,246,0.18), 0 8px 32px -8px rgba(139,92,246,0.12), 0 0 0 1px rgba(255,255,255,0.3)"
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Subtle luxury shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-20" 
                 style={{ 
                   animation: "shimmer 4s ease-in-out infinite",
                   backgroundSize: "200% 100%"
                 }} />
            
            {/* Reduced padding for more compact design */}
            <div className="relative py-12 px-6 md:px-10 lg:px-12">
              <ContentCard 
                language={isVietnamese ? "vi" : "en"} 
                itemVariants={itemVariants} 
              />
            </div>
          </motion.div>
          
          {/* Enhanced language toggle */}
          <motion.div 
            className="absolute -bottom-3 right-3 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <LanguageToggleButton
              isVietnamese={isVietnamese}
              toggleLanguage={toggleLanguage}
              className="shadow-2xl backdrop-blur-md border border-white/50 hover:shadow-purple-500/20 transition-all duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
