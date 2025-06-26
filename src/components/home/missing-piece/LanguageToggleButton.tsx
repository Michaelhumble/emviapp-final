
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
      className={`flex items-center rounded-full ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Toggle
        pressed={!isVietnamese}
        onPressedChange={() => isVietnamese && toggleLanguage()}
        className={`px-4 py-2 h-10 rounded-l-full transition-all duration-200 ${
          !isVietnamese 
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-sm" 
            : "opacity-70 hover:opacity-90"
        }`}
      >
        <span className="text-sm flex items-center gap-1.5">
          {!isVietnamese && <Globe className="h-3.5 w-3.5" />}
          English
        </span>
      </Toggle>
      
      <div className="w-px h-4 bg-gray-300"></div>
      
      <Toggle
        pressed={isVietnamese}
        onPressedChange={() => !isVietnamese && toggleLanguage()}
        className={`px-4 py-2 h-10 rounded-r-full transition-all duration-200 ${
          isVietnamese 
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-sm" 
            : "opacity-70 hover:opacity-90"
        }`}
      >
        <span className="text-sm flex items-center gap-1.5">
          {isVietnamese && <Globe className="h-3.5 w-3.5" />}
          Tiếng Việt
        </span>
      </Toggle>
    </motion.div>
  );
};

export default LanguageToggleButton;
