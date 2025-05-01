
import React from "react";
import { motion } from "framer-motion";

interface LanguageToggleButtonProps {
  language: "en" | "vi";
  setLanguage: (lang: "en" | "vi") => void;
  itemVariants: any;
}

const LanguageToggleButton = ({ language, setLanguage, itemVariants }: LanguageToggleButtonProps) => {
  // Safety check for language value
  const currentLanguage = language === "vi" ? "vi" : "en";
  
  return (
    <motion.div 
      className="flex justify-center mb-8"
      variants={itemVariants}
    >
      <div className="bg-gray-100 rounded-full p-1 flex shadow-sm">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            currentLanguage === "en" 
              ? "bg-white text-violet-600 shadow-sm" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("vi")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            currentLanguage === "vi" 
              ? "bg-white text-violet-600 shadow-sm" 
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          VI
        </button>
      </div>
    </motion.div>
  );
};

export default LanguageToggleButton;
