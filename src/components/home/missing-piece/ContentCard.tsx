
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";
import { useTranslation } from "@/hooks/useTranslation";

interface ContentCardProps {
  itemVariants: any;
}

const ContentCard = ({ itemVariants }: ContentCardProps) => {
  const { isVietnamese } = useTranslation();
  
  return (
    <motion.div 
      className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 mb-6 sm:mb-12 border border-indigo-100/50 relative overflow-hidden"
      variants={itemVariants}
      initial="visible" 
      layoutId="content-card"
      layout
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isVietnamese ? "vi" : "en"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <EnglishContent itemVariants={itemVariants} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentCard;
