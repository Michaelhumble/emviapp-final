
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { getLanguagePreference, setLanguagePreference } from "@/utils/languagePreference";

interface LanguageSelectorProps {
  onChange?: (language: "en" | "vi") => void;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onChange,
  className = ""
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
    <div className={`flex justify-center mb-6 ${className}`}>
      <div className="inline-flex rounded-md p-1 bg-gray-100">
        <Button
          variant={isVietnamese ? "ghost" : "default"}
          size="sm"
          onClick={handleLanguageToggle}
          className={`text-sm px-4 ${!isVietnamese ? 'shadow-sm' : ''}`}
        >
          English
        </Button>
        <Button
          variant={!isVietnamese ? "ghost" : "default"}
          size="sm" 
          onClick={handleLanguageToggle}
          className={`text-sm px-4 ${isVietnamese ? 'shadow-sm' : ''}`}
        >
          Tiếng Việt
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
