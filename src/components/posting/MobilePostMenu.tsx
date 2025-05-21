
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';

const MobilePostMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button 
        variant="outline" 
        size="sm"
        className="rounded-full p-2 h-10 w-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg border p-4 z-50">
          <div className="space-y-4">
            <div className="pb-2 border-b">
              <h4 className="font-medium text-sm mb-1">
                {t({
                  english: 'Language',
                  vietnamese: 'Ngôn ngữ'
                })}
              </h4>
              <LanguageToggle />
            </div>

            <div className="pb-2">
              <h4 className="font-medium text-sm mb-1">
                {t({
                  english: 'Help',
                  vietnamese: 'Trợ giúp'
                })}
              </h4>
              <a href="mailto:support@emviapp.com" className="text-sm text-primary block py-1">
                {t({
                  english: 'Contact Support',
                  vietnamese: 'Liên hệ hỗ trợ'
                })}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePostMenu;
