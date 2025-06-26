
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggleButton from "../missing-piece/LanguageToggleButton";
import AIMatchmakerContent from "./AIMatchmakerContent";
import AIMatchmakerTitle from "./AIMatchmakerTitle";

const AIMatchmakerSection = () => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  // Define motion variants for animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Sparkle animation keyframes
  const sparkleVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium pearl gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/10" />
      
      {/* Animated luxury sparkles */}
      <motion.div
        className="absolute top-16 left-1/4 text-amber-400 text-2xl"
        variants={sparkleVariants}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-32 right-1/3 text-purple-400 text-xl"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-1/6 text-indigo-400 text-lg"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "3s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/5 text-rose-400 text-xl"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <AIMatchmakerTitle 
          language={isVietnamese ? "vi" : "en"} 
          itemVariants={itemVariants} 
        />
        
        <div className="relative">
          {/* Premium glassmorphism hero container */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/30"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(252,252,255,0.9) 100%)",
              boxShadow: "0 32px 64px -12px rgba(139,92,246,0.15), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subtle luxury shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
                 style={{ animationDuration: "4s" }} />
            
            <div className="relative py-20 px-8 md:px-20 lg:px-28">
              <AIMatchmakerContent 
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
              className="shadow-xl backdrop-blur-md border border-white/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMatchmakerSection;
