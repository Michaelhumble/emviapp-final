
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Languages } from 'lucide-react';
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
          className="flex items-center gap-1.5 hover:bg-gray-100/80 rounded-full px-3 py-1 h-auto"
        >
          <Languages className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">
            {language === "en" ? "EN / VI" : "VI / EN"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="hidden md:flex items-center mr-2">
        <Languages className="h-4 w-4 mr-1" />
        <span className="text-sm">Language:</span>
      </div>
      <ToggleGroup type="single" value={language} onValueChange={handleLanguageChange}>
        <ToggleGroupItem value="vi" className="text-xs px-2 py-1">
          🇻🇳 Vietnamese
        </ToggleGroupItem>
        <ToggleGroupItem value="en" className="text-xs px-2 py-1">
          🇺🇸 English
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageToggle;
