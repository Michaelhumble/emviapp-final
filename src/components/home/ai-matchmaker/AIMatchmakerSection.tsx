
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "../missing-piece/LanguageToggleButton";
import AIMatchmakerContent from "./AIMatchmakerContent";
import AIMatchmakerTitle from "./AIMatchmakerTitle";
import { sparkle, tSlow, sparkleTransition } from "@/lib/motion";

const AIMatchmakerSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Enhanced motion variants for luxury animations
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/50">
      {/* Modern gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-indigo-300/15 to-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-200/15 to-orange-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Floating sparkles */}
      <motion.div
        className="absolute top-20 left-1/4 text-purple-400 text-2xl opacity-70"
        variants={sparkle}
        animate="animate"
        transition={sparkleTransition}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/3 text-amber-400 text-xl opacity-70"
        variants={sparkle}
        animate="animate"
        transition={{ ...sparkleTransition, delay: 2 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/6 text-pink-400 text-2xl opacity-70"
        variants={sparkle}
        animate="animate"
        transition={{ ...sparkleTransition, delay: 4 }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <AIMatchmakerTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants}
        />
        
        <AIMatchmakerContent 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants}
        />
        
        {/* Language toggle positioned at bottom */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <LanguageToggleButton
            isVietnamese={isVietnamese}
            toggleLanguage={toggleLanguage}
            className="shadow-lg backdrop-blur-sm border border-white/40 hover:shadow-purple-500/20 transition-all duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AIMatchmakerSection;
