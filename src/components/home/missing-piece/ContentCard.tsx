
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  return (
    <motion.div 
      className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 mb-6 sm:mb-12 border border-white/30 overflow-hidden group"
      variants={itemVariants}
      initial="visible" 
      layoutId="content-card"
      layout
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/30 via-pink-300/30 to-indigo-400/30 p-[2px] group-hover:from-purple-400/50 group-hover:via-pink-300/50 group-hover:to-indigo-400/50 transition-all duration-500">
        <div className="h-full w-full rounded-3xl bg-white/10 backdrop-blur-xl" />
      </div>
      
      {/* Premium background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 via-pink-200/15 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/20 via-blue-200/15 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-4 left-4 text-yellow-300 animate-pulse opacity-60">✨</div>
      <div className="absolute top-8 right-8 text-purple-300 animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-8 left-8 text-pink-300 animate-pulse opacity-50" style={{ animationDelay: '1.5s' }}>✨</div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            {language === "en" ? (
              <EnglishContent itemVariants={itemVariants} />
            ) : (
              <VietnameseContent itemVariants={itemVariants} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContentCard;
