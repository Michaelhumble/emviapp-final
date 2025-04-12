
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<"en" | "vi">("en");

  useEffect(() => {
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en";
    setLanguage(newLanguage);
    localStorage.setItem('emvi_language_preference', newLanguage);
    
    // Dispatch a custom event to notify other components about the language change
    const event = new CustomEvent('languageChanged', {
      detail: { language: newLanguage }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleLanguage}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        {language === "en" ? "English / Tiếng Việt" : "Tiếng Việt / English"}
      </Button>
    </div>
  );
};

export default LanguageToggle;
