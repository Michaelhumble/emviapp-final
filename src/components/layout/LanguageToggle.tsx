
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // Get the stored language preference from localStorage if available
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    if (value) {
      setLanguage(value);
      localStorage.setItem('emvi_language_preference', value);
      // In a real app, you would handle language switching more thoroughly
      // This is just a UI demonstration
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
