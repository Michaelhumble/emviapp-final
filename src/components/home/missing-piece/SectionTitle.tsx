
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  return (
    <motion.div 
      className="text-center mb-16"
      variants={itemVariants}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight relative inline-block">
        {language === "en" ? (
          "Let's Experience EmviApp Together"
        ) : (
          "Hãy Cùng Nhau Trải Nghiệm EmviApp"
        )}
        <span className="absolute -top-6 -right-8 text-2xl">✨</span>
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-purple-500 mt-4 rounded-full"></div>
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
