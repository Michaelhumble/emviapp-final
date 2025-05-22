
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageToggle from '@/components/layout/LanguageToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router-dom';

const MobilePostMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full p-2 h-10 w-10 bg-white border border-gray-200 shadow-sm"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open settings menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">
              {t({
                english: 'Settings',
                vietnamese: 'Cài đặt'
              })}
            </h3>
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">
                {t({
                  english: 'Language',
                  vietnamese: 'Ngôn ngữ'
                })}
              </h4>
              <LanguageToggle />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">
                {t({
                  english: 'Support',
                  vietnamese: 'Hỗ trợ'
                })}
              </h4>
              <div className="space-y-2">
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-purple-600"
                  asChild
                >
                  <a href="mailto:support@emviapp.com">
                    {t({
                      english: 'Email Support',
                      vietnamese: 'Gửi Email Hỗ trợ'
                    })}
                  </a>
                </Button>
                <div>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-purple-600 block"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t({
                      english: 'Return to Dashboard',
                      vietnamese: 'Quay lại Bảng điều khiển'
                    })}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pb-4">
            <p className="text-center text-base bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent font-medium">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobilePostMenu;
