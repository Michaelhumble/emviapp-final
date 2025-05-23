
import React from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface LanguageToggleButtonProps {
  isVietnamese: boolean;
  toggleLanguage: () => void;
  className?: string;
}

const LanguageToggleButton = ({ isVietnamese, toggleLanguage, className = "" }: LanguageToggleButtonProps) => {
  return (
    <motion.div
      className={`flex items-center bg-white rounded-full shadow-md ${className}`}
      whileHover={{ scale: 1.03 }}
    >
      <Toggle
        pressed={!isVietnamese}
        onPressedChange={() => isVietnamese && toggleLanguage()}
        className={`px-3 py-1 h-9 rounded-l-full ${!isVietnamese ? "bg-primary/10 font-medium" : "opacity-70"}`}
      >
        <span className="text-sm flex items-center gap-1">
          {!isVietnamese && <Globe className="h-3.5 w-3.5 text-primary" />}
          English
        </span>
      </Toggle>
      
      <div className="w-px h-4 bg-gray-300"></div>
      
      <Toggle
        pressed={isVietnamese}
        onPressedChange={() => !isVietnamese && toggleLanguage()}
        className={`px-3 py-1 h-9 rounded-r-full ${isVietnamese ? "bg-primary/10 font-medium" : "opacity-70"}`}
      >
        <span className="text-sm flex items-center gap-1">
          {isVietnamese && <Globe className="h-3.5 w-3.5 text-primary" />}
          Tiếng Việt
        </span>
      </Toggle>
    </motion.div>
  );
};

export default LanguageToggleButton;
