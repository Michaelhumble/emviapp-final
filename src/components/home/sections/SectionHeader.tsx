
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
      <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">
        {title}
        {isVietnamese && vietnameseTitle && (
          <span className="block text-xl md:text-2xl text-slate-600 mt-3 font-primary font-medium">
            {vietnameseTitle}
          </span>
        )}
      </h2>
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-primary">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
