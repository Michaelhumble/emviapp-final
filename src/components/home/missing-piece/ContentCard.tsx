
import React from "react";
import { motion } from "framer-motion";
import EnglishContent from "./EnglishContent";
import VietnameseContent from "./VietnameseContent";

interface ContentCardProps {
  language: "en" | "vi";
  itemVariants: any;
}

const ContentCard = ({ language, itemVariants }: ContentCardProps) => {
  return (
    <motion.div
      className="relative z-10 max-w-3xl mx-auto"
      variants={itemVariants}
    >
      {language === "en" ? (
        <EnglishContent itemVariants={itemVariants} />
      ) : (
        <VietnameseContent itemVariants={itemVariants} />
      )}
    </motion.div>
  );
};

export default ContentCard;
