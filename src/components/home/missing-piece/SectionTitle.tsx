
import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  return (
    <motion.div
      className="text-center mb-8"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium text-gray-900 mb-4">
        {language === "en" 
          ? "Let's Experience EmviApp Together"
          : "Cùng Trải Nghiệm EmviApp"}
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {language === "en"
          ? "Built With Love for the Beauty Community"
          : "Nơi Kết Nối Cộng Đồng Làm Đẹp Với Tình Thương"}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
