
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Globe, Languages } from 'lucide-react';
import { setLanguagePreference, getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

interface LanguageToggleProps {
  className?: string;
  minimal?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className, minimal = false }) => {
  const [language, setLanguage] = useState<string>(getLanguagePreference());

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const handleLanguageChange = (value: string) => {
    if (value && (value === 'en' || value === 'vi')) {
      setLanguage(value);
      setLanguagePreference(value as 'en' | 'vi');
    }
  };

  if (minimal) {
    return (
      <div className={`flex items-center ${className}`}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleLanguageChange(language === 'en' ? 'vi' : 'en')}
          className="flex items-center gap-1.5 hover:bg-gray-100/80 rounded-full px-2 py-1 h-auto"
          aria-label={language === "en" ? "Switch to Vietnamese" : "Switch to English"}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">
            {language === "en" ? "EN" : "VI"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <ToggleGroup type="single" value={language} onValueChange={handleLanguageChange} className="flex flex-wrap">
        <ToggleGroupItem value="vi" className="text-xs px-2 py-1">
          Tiếng Việt
        </ToggleGroupItem>
        <ToggleGroupItem value="en" className="text-xs px-2 py-1">
          English
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
