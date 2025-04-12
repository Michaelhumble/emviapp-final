
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Languages } from 'lucide-react';
import { setLanguagePreference, getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
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
