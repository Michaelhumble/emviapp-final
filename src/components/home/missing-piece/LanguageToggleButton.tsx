
import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguageToggleButtonProps {
  language: "en" | "vi";
  setLanguage: (language: "en" | "vi") => void;
  itemVariants: any;
}

const LanguageToggleButton = ({ language, setLanguage, itemVariants }: LanguageToggleButtonProps) => {
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en";
    setLanguage(newLanguage);
    localStorage.setItem('emvi_language_preference', newLanguage);
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  return (
    <motion.div 
      className="flex justify-center"
      variants={itemVariants}
    >
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2.5 rounded-full bg-white shadow-lg text-gray-700 text-sm font-medium border border-indigo-100 hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-3"
      >
        <Globe className="h-4 w-4 mr-2 text-indigo-700" />
        <span className="text-indigo-700">
          {language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageToggleButton;
