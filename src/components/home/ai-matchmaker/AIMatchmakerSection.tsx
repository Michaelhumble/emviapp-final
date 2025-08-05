
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "../missing-piece/LanguageToggleButton";
import AIMatchmakerContent from "./AIMatchmakerContent";
import AIMatchmakerTitle from "./AIMatchmakerTitle";

const AIMatchmakerSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Enhanced motion variants for luxury animations
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Refined sparkle animation
  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50/60 via-white to-purple-50/30">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-8">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gradient-to-tl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-amber-300/10 to-orange-300/10 rounded-full blur-3xl" />
      </div>
      
      {/* Elegant floating sparkles */}
      <motion.div
        className="absolute top-20 left-1/4 text-purple-400 text-xl opacity-60"
        variants={sparkleVariants}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/3 text-amber-400 text-lg opacity-60"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/6 text-pink-400 text-xl opacity-60"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <AIMatchmakerTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants} 
        />
        
        <div className="relative max-w-7xl mx-auto">
          {/* Redesigned premium container */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 50%, rgba(248,250,252,0.95) 100%)",
              boxShadow: "0 32px 64px -12px rgba(139,92,246,0.20), 0 8px 32px -8px rgba(139,92,246,0.15), 0 0 0 1px rgba(255,255,255,0.3)"
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Subtle luxury shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30" 
                 style={{ 
                   animation: "shimmer 4s ease-in-out infinite",
                   backgroundSize: "200% 100%"
                 }} />
            
            <div className="relative py-16 px-6 md:px-12 lg:px-16">
              <AIMatchmakerContent 
                language={isVietnamese ? "vi" : "en"} 
                itemVariants={itemVariants} 
              />
            </div>
          </motion.div>
          
          {/* Enhanced language toggle */}
          <motion.div 
            className="absolute -bottom-4 right-4 z-20"
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

export default AIMatchmakerSection;
