
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Globe, Languages, Check } from 'lucide-react';
import { setLanguagePreference, getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  className?: string;
  minimal?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className, minimal = false }) => {
  const [language, setLanguage] = useState<string>(getLanguagePreference());
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      setDrawerOpen(false);
    }
  };

  // Mobile drawer version for better UX on small screens
  const renderMobileDrawer = () => (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 hover:bg-gray-100/80 rounded-full px-3 py-1.5 h-auto"
          aria-label="Language Selection"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {language === "en" ? "EN" : "VI"}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6 pt-2">
        <div className="mt-2 flex flex-col space-y-3">
          <h3 className="text-lg font-medium mb-2 text-center">Choose Language</h3>
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            className="w-full h-14 justify-start text-lg font-medium"
            onClick={() => handleLanguageChange('en')}
          >
            <span className="mr-2">🇺🇸</span> English
            {language === 'en' && <Check className="ml-auto h-4 w-4" />}
          </Button>
          <Button
            variant={language === 'vi' ? 'default' : 'outline'}
            className="w-full h-14 justify-start text-lg font-medium"
            onClick={() => handleLanguageChange('vi')}
          >
            <span className="mr-2">🇻🇳</span> Tiếng Việt
            {language === 'vi' && <Check className="ml-auto h-4 w-4" />}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );

  if (minimal) {
    return (
      <div className={`flex items-center ${className}`}>
        {renderMobileDrawer()}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="hidden md:block">
        <ToggleGroup type="single" value={language} onValueChange={handleLanguageChange} className="flex flex-wrap">
          <ToggleGroupItem value="vi" className="text-xs px-2 py-1">
            Tiếng Việt
          </ToggleGroupItem>
          <ToggleGroupItem value="en" className="text-xs px-2 py-1">
            English
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="md:hidden">
        {renderMobileDrawer()}
      </div>
    </div>
  );
};

export default LanguageToggle;
