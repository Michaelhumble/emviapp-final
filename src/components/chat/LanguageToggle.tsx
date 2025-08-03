import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'vi';
  onLanguageChange: (language: 'en' | 'vi') => void;
}

export const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
      <Globe size={16} className="text-orange-500" />
      <div className="flex items-center gap-1">
        <Button
          variant={currentLanguage === 'vi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('vi')}
          className={`text-xs h-6 px-2 ${
            currentLanguage === 'vi' 
              ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white' 
              : 'text-orange-600 hover:bg-orange-100'
          }`}
        >
          Tiếng Việt
        </Button>
        <span className="text-orange-300">|</span>
        <Button
          variant={currentLanguage === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('en')}
          className={`text-xs h-6 px-2 ${
            currentLanguage === 'en' 
              ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white' 
              : 'text-orange-600 hover:bg-orange-100'
          }`}
        >
          English
        </Button>
      </div>
    </div>
  );
};