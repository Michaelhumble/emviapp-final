
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
      className="relative overflow-hidden group mb-8 sm:mb-16"
      variants={itemVariants}
      initial="visible" 
      layoutId="content-card"
      layout
      whileHover={{ 
        scale: 1.005,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
    >
      {/* Multi-layered glassmorphism container */}
      <div className="relative rounded-[3.5rem] p-[3px] bg-gradient-to-br from-white/60 via-purple-200/40 to-amber-200/50 shadow-2xl">
        <div className="relative rounded-[3.4rem] p-[2px] bg-gradient-to-br from-purple-100/50 via-white/30 to-gold-100/40">
          <div 
            className="relative rounded-[3.3rem] p-8 sm:p-12 md:p-20 lg:p-24 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.75) 15%, rgba(243,232,255,0.6) 35%, rgba(254,249,195,0.5) 65%, rgba(255,255,255,0.8) 85%, rgba(240,245,255,0.9) 100%)',
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Advanced floating elements */}
            <div className="absolute top-8 left-8 text-3xl animate-pulse opacity-80">
              <span className="text-yellow-400 drop-shadow-2xl filter">✨</span>
            </div>
            <div className="absolute top-16 right-12 text-2xl animate-pulse opacity-60" style={{ animationDelay: '1.2s' }}>
              <span className="text-purple-400 drop-shadow-lg">✨</span>
            </div>
            <div className="absolute bottom-20 left-12 text-xl animate-pulse opacity-70" style={{ animationDelay: '2.4s' }}>
              <span className="text-pink-400 drop-shadow-lg">✨</span>
            </div>
            <div className="absolute top-1/3 right-8 text-lg animate-pulse opacity-50" style={{ animationDelay: '3s' }}>
              <span className="text-indigo-400 drop-shadow-lg">✨</span>
            </div>
            
            {/* Premium animated light beams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/5 w-[2px] h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse opacity-40"></div>
              <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-200/40 to-transparent animate-pulse opacity-30" style={{ animationDelay: '1.8s' }}></div>
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-200/30 to-transparent animate-pulse opacity-25" style={{ animationDelay: '3.2s' }}></div>
            </div>
            
            {/* Sophisticated gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3 animate-pulse opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/35 via-blue-200/25 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3 animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-amber-200/20 via-yellow-200/15 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-30" style={{ animationDelay: '4s' }}></div>
            
            {/* Luxury floating particles */}
            <div className="absolute top-12 right-20 w-6 h-6 bg-gradient-to-br from-yellow-300/80 to-amber-300/60 rounded-full blur-sm opacity-70 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute bottom-24 right-24 w-4 h-4 bg-gradient-to-br from-purple-300/70 to-pink-300/50 rounded-full blur-sm opacity-60 animate-pulse" style={{ animationDelay: '2.8s' }}></div>
            <div className="absolute top-1/4 left-16 w-5 h-5 bg-gradient-to-br from-indigo-300/60 to-blue-300/40 rounded-full blur-sm opacity-50 animate-pulse" style={{ animationDelay: '4.2s' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gradient-to-br from-rose-300/70 to-pink-300/50 rounded-full blur-sm opacity-55 animate-pulse" style={{ animationDelay: '5.5s' }}></div>
            
            {/* Ultra-premium mesh pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `radial-gradient(circle at 3px 3px, rgba(139, 92, 246, 0.6) 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }}></div>
            
            {/* Secondary premium overlay pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(45deg, rgba(236, 72, 153, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%)`,
              backgroundSize: '64px 64px'
            }}></div>
            
            {/* Premium shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={language}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
