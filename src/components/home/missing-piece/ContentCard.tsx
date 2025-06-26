
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
      className="relative overflow-hidden"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-40"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Main Headline */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 leading-tight tracking-wide">
          {language === "en" 
            ? "Let's Experience EmviApp Together"
            : "Hãy Cùng Nhau Trải Nghiệm EmviApp"}
          <span className="inline-block ml-2 text-yellow-300">✨</span>
        </h2>
        
        {/* Animated Underline */}
        <div className="relative flex justify-center mb-8">
          <motion.div
            className="h-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "300px" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
          <motion.div
            className="absolute -right-4 -top-2 text-yellow-300"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            ✨
          </motion.div>
        </div>

        {/* Hero Subheadline */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-playfair font-medium bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {language === "en"
            ? "Built With Love for the Beauty Community"
            : "Được Xây Dựng Với Tình Yêu Cho Ngành Làm Đẹp"}
        </motion.p>
      </motion.div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
        {language === "en" ? <EnglishContent /> : <VietnameseContent />}
      </div>

      {/* Premium CTA Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <Link to="/auth/signup">
          <Button
            size="lg"
            className="relative overflow-hidden group px-12 py-6 text-xl font-bold rounded-3xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 hover:from-yellow-300 hover:via-pink-300 hover:to-purple-400 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 min-w-[280px] md:min-w-[400px]"
          >
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
            
            <span className="relative z-10">
              {language === "en"
                ? "Try it now and experience the difference →"
                : "Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →"}
            </span>
          </Button>
        </Link>
      </motion.div>

      {/* Floating Mist Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-yellow-400/5 pointer-events-none" />
    </motion.div>
  );
};

export default ContentCard;
