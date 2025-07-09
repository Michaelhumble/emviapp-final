
import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  return (
    <motion.div
      className="text-center mb-16 md:mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
    >
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-4 leading-tight">
          {language === "en" ? (
            <>
              Let's Experience EmviApp<br />Together
            </>
          ) : (
            <>
              Hãy Cùng Nhau Trải Nghiệm<br />EmviApp
            </>
          )}
          <span className="inline-block ml-2 text-3xl md:text-4xl lg:text-5xl animate-pulse">✨</span>
        </h2>
        
        {/* Premium gradient underline */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
          style={{
            width: "60%",
            background: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
            boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)"
          }}
        />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
