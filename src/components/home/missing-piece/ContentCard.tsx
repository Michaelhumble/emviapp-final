
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  return (
    <motion.div 
      className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-indigo-100/50 relative overflow-hidden"
      variants={itemVariants}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      {language === "en" ? (
        <EnglishContent itemVariants={itemVariants} />
      ) : (
        <VietnameseContent itemVariants={itemVariants} />
      )}
    </motion.div>
  );
};

export default ContentCard;
