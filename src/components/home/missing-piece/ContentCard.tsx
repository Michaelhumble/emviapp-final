
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  return (
    <motion.div
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 md:py-20"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Sparkles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full opacity-70"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-50"
          animate={{
            y: [0, -10, 0],
            x: [0, 12, 0],
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Gold/Pink Mist Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-pink-200/10 to-purple-200/10 animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Premium Headline */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-4 md:mb-6 leading-tight">
            {language === "en" 
              ? "Let's Experience EmviApp Together"
              : "Hãy Cùng Nhau Trải Nghiệm EmviApp"}
          </h2>
          
          {/* Animated Underline with Sparkle */}
          <motion.div
            className="relative inline-block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full mx-auto w-32 md:w-48 lg:w-64" />
            <motion.span
              className="absolute -right-6 md:-right-8 -top-2 text-2xl md:text-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✨
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Hero Subheadline */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-playfair font-medium bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-12 md:mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {language === "en"
            ? "Built With Love for the Beauty Community"
            : "Được Xây Dựng Với Tình Yêu Cho Ngành Làm Đẹp"}
        </motion.p>

        {/* Premium Content Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {language === "en" ? <EnglishContent /> : <VietnameseContent />}
        </motion.div>

        {/* Ultra-Premium CTA Button */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link to="/auth/signup">
            <Button 
              size="lg" 
              className="relative group overflow-hidden bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 text-white font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-white/20 backdrop-blur-sm min-h-[60px] md:min-h-[70px]"
            >
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
              
              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                {language === "en"
                  ? "Try it now and experience the difference"
                  : "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ"}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Mobile Sticky CTA (visible only on mobile) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <Link to="/auth/signup">
          <Button 
            size="lg" 
            className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 text-white font-bold text-lg px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm min-h-[60px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-2xl blur-xl transition-all duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {language === "en" ? "Experience EmviApp Now" : "Trải Nghiệm EmviApp Ngay"}
              <span>→</span>
            </span>
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ContentCard;
