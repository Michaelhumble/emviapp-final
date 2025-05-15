
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { setLanguagePreference } from "@/utils/languagePreference";
import { motion } from "framer-motion";

interface LanguageSelectorProps {
  onChange?: (language: "en" | "vi") => void;
  className?: string;
  sticky?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onChange,
  className = "",
  sticky = false
}) => {
  const { isVietnamese } = useTranslation();
  
  const handleLanguageToggle = () => {
    const newLanguage = isVietnamese ? "en" : "vi";
    setLanguagePreference(newLanguage);
    if (onChange) {
      onChange(newLanguage);
    }
  };
  
  return (
    <motion.div 
      className={`flex justify-center mb-6 ${sticky ? 'sticky top-4 z-50' : ''} ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="inline-flex rounded-lg p-1 bg-gray-100 shadow-sm">
        <Button
          variant={isVietnamese ? "ghost" : "default"}
          size="sm"
          onClick={handleLanguageToggle}
          className={`text-sm font-medium px-4 py-2 transition-all ${!isVietnamese ? 'shadow-sm' : ''}`}
        >
          <span className="mr-1.5">🇺🇸</span> English
        </Button>
        <Button
          variant={!isVietnamese ? "ghost" : "default"}
          size="sm" 
          onClick={handleLanguageToggle}
          className={`text-sm font-medium px-4 py-2 transition-all ${isVietnamese ? 'shadow-sm' : ''}`}
        >
          <span className="mr-1.5">🇻🇳</span> Tiếng Việt
        </Button>
      </div>
    </motion.div>
  );
};

export default LanguageSelector;
