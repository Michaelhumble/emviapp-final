
import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariants}
    >
      <div className="relative inline-block max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {language === "en" ? (
            <>
              Let's Experience EmviApp Together
            </>
          ) : (
            <>
              Hãy Cùng Nhau Trải Nghiệm EmviApp
            </>
          )}
          <motion.span 
            className="inline-block ml-3 text-2xl md:text-3xl lg:text-4xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ✨
          </motion.span>
        </motion.h2>
        
        {/* Enhanced premium gradient underline */}
        <motion.div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
          style={{
            width: "75%",
            background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)"
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "75%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
