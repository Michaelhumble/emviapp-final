
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { getLanguagePreference, setLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

interface LanguageToggleProps {
  className?: string;
  minimal?: boolean;
}

const LanguageToggle = ({ className = "", minimal = false }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en";
    setLanguage(newLanguage);
    setLanguagePreference(newLanguage);
  };

  if (minimal) {
    return (
      <div className={`flex items-center ${className}`}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 hover:bg-gray-100/80 rounded-full px-3 py-1 h-auto"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">
            {language === "en" ? "EN / VI" : "VI / EN"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleLanguage}
        className="flex items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <Globe className="h-4 w-4" />
        {language === "en" ? "English / Tiếng Việt" : "Tiếng Việt / English"}
      </Button>
    </div>
  );
};

export default LanguageToggle;
