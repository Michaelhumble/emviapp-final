
import React from "react";
import { motion } from "framer-motion";

interface LanguageToggleButtonProps {
  isVietnamese: boolean;
  toggleLanguage: () => void;
}

const LanguageToggleButton = ({ isVietnamese, toggleLanguage }: LanguageToggleButtonProps) => {
  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={isVietnamese ? "opacity-50" : "font-medium"}>English</span>
      <span className="w-px h-4 bg-gray-300 mx-2"></span>
      <span className={isVietnamese ? "font-medium" : "opacity-50"}>Tiếng Việt</span>
    </motion.button>
  );
};

export default LanguageToggleButton;
