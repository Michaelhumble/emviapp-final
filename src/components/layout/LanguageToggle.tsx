
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Globe, Check, X } from 'lucide-react';
import { setLanguagePreference, getLanguagePreference, addLanguageChangeListener } from '@/utils/languagePreference';

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

  // Enhanced language drawer for mobile
  const renderMobileDrawer = () => (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 h-9"
        >
          <Globe className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">
            {language === "en" ? "English" : "Tiếng Việt"}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6 pt-2">
        <div className="flex justify-between items-center mb-3 pt-2">
          <h3 className="text-lg font-medium text-center flex-1">Choose Language</h3>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>
        </div>
        <div className="flex flex-col space-y-3">
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

  // Minimal version (for navbar)
  if (minimal) {
    return (
      <div className={`flex items-center ${className}`}>
        {renderMobileDrawer()}
      </div>
    );
  }

  // Full version (for mobile menu)
  return (
    <div className={`flex items-center ${className}`}>
      <div className="hidden md:block">
        <ToggleGroup type="single" value={language} onValueChange={handleLanguageChange} className="flex flex-wrap">
          <ToggleGroupItem value="en" className="text-xs px-3 py-1.5 min-h-[40px]">
            <span className="mr-1">🇺🇸</span> English
          </ToggleGroupItem>
          <ToggleGroupItem value="vi" className="text-xs px-3 py-1.5 min-h-[40px]">
            <span className="mr-1">🇻🇳</span> Tiếng Việt
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
