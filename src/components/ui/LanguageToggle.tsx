
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Check } from "lucide-react";
import { getLanguagePreference, setLanguagePreference, addLanguageChangeListener } from "@/utils/languagePreference";

interface LanguageToggleProps {
  className?: string;
  minimal?: boolean;
}

const LanguageToggle = ({ className = "", minimal = false }: LanguageToggleProps) => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const removeListener = addLanguageChangeListener((newLanguage) => {
      setLanguage(newLanguage);
    });
    
    return removeListener;
  }, []);

  const handleLanguageChange = (newLanguage: "en" | "vi") => {
    setLanguage(newLanguage);
    setLanguagePreference(newLanguage);
    setDrawerOpen(false);
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
            <Globe className="mr-2 h-4 w-4" /> English
            {language === 'en' && <Check className="ml-auto h-4 w-4" />}
          </Button>
          <Button
            variant={language === 'vi' ? 'default' : 'outline'}
            className="w-full h-14 justify-start text-lg font-medium"
            onClick={() => handleLanguageChange('vi')}
          >
            <Globe className="mr-2 h-4 w-4" /> Tiếng Việt
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
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleLanguageChange(language === "en" ? "vi" : "en")}
          className="flex items-center gap-2 hover:bg-primary/5 transition-colors"
        >
          <span className="text-sm">
            {language === "en" ? "English | Tiếng Việt" : "Tiếng Việt | English"}
          </span>
        </Button>
      </div>
      
      <div className="md:hidden">
        {renderMobileDrawer()}
      </div>
    </div>
  );
};

export default LanguageToggle;
