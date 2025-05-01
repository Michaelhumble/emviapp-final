
import React from "react";
import { motion } from "framer-motion";

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
      {language === "en" ? (
        <motion.h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
          The Platform You've Been Waiting For
        </motion.h2>
      ) : (
        <motion.h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-gray-900">
          Nền Tảng Mà Bạn Đang Chờ Đợi
        </motion.h2>
      )}
      <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {language === "en" 
          ? "Connecting beauty professionals with the right opportunities across salons, booth rentals, and established businesses for sale."
          : "Kết nối các chuyên gia làm đẹp với cơ hội phù hợp trên các tiệm salon, cho thuê booth, và các doanh nghiệp đang bán."
        }
      </motion.p>
    </motion.div>
  );
};

export default SectionTitle;
