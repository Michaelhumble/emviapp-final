
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
      className="relative bg-gradient-to-br from-white/30 via-white/20 to-purple-50/30 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden group p-8 sm:p-12 md:p-16 mb-8 sm:mb-16"
      variants={itemVariants}
      initial="visible" 
      layoutId="content-card"
      layout
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(248,250,252,0.3) 25%, rgba(243,232,255,0.25) 50%, rgba(254,249,195,0.2) 75%, rgba(255,255,255,0.3) 100%)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
      }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Premium floating sparkles with animation */}
      <div className="absolute top-6 left-6 text-2xl animate-pulse opacity-70">
        <span className="text-yellow-400 drop-shadow-lg">✨</span>
      </div>
      <div className="absolute top-12 right-8 text-xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}>
        <span className="text-purple-400 drop-shadow-lg">✨</span>
      </div>
      <div className="absolute bottom-12 left-10 text-lg animate-pulse opacity-60" style={{ animationDelay: '2s' }}>
        <span className="text-pink-400 drop-shadow-lg">✨</span>
      </div>
      
      {/* Subtle animated light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse opacity-30"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-200/30 to-transparent animate-pulse opacity-20" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Premium gradient overlay border */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-purple-200/20 via-pink-200/15 to-yellow-200/20 p-[2px] group-hover:from-purple-300/30 group-hover:via-pink-300/25 group-hover:to-yellow-300/30 transition-all duration-700">
        <div className="h-full w-full rounded-[2.4rem] bg-transparent" />
      </div>
      
      {/* Luxury background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-100/25 via-blue-100/20 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Floating shimmer effect */}
      <div className="absolute top-8 right-12 w-4 h-4 bg-gradient-to-br from-yellow-300 to-amber-200 rounded-full blur-sm opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-16 right-16 w-3 h-3 bg-gradient-to-br from-purple-300 to-pink-200 rounded-full blur-sm opacity-50 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Premium mesh pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>
      
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
