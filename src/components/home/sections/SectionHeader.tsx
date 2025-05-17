
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface SectionHeaderProps {
  title: string;
  vietnameseTitle?: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  vietnameseTitle, 
  description 
}) => {
  const { isVietnamese } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight">
        {title}
        {isVietnamese && vietnameseTitle && (
          <span className="block text-xl md:text-2xl text-gray-600 mt-2">
            {vietnameseTitle}
          </span>
        )}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
