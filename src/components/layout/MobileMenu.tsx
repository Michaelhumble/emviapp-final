
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Home, Users, Building2, Briefcase, MessageSquare, Info, Phone, Calendar, Store } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguagePreference, setLanguagePreference } from '@/utils/languagePreference';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { t, isVietnamese } = useTranslation();
  const [language, setLanguage] = React.useState(getLanguagePreference());

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);
    setLanguagePreference(newLanguage);
    window.location.reload();
  };

  const menuItems = [
    { 
      name: t({ english: "Dashboard", vietnamese: "Bảng điều khiển" }), 
      href: "/dashboard", 
      icon: Home,
      showWhen: !!user 
    },
    { 
      name: t({ english: "Home", vietnamese: "Trang chủ" }), 
      href: "/", 
      icon: Home 
    },
    { 
      name: t({ english: "Artists", vietnamese: "Nghệ sĩ" }), 
      href: "/artists", 
      icon: Users 
    },
    { 
      name: t({ english: "Salons", vietnamese: "Salon" }), 
      href: "/salons", 
      icon: Building2 
    },
    { 
      name: t({ english: "Jobs", vietnamese: "Việc làm" }), 
      href: "/jobs", 
      icon: Briefcase 
    },
    { 
      name: t({ english: "Community", vietnamese: "Cộng đồng" }), 
      href: "/community", 
      icon: MessageSquare 
    },
    { 
      name: t({ english: "About", vietnamese: "Giới thiệu" }), 
      href: "/about", 
      icon: Info 
    },
    { 
      name: t({ english: "Contact", vietnamese: "Liên hệ" }), 
      href: "/contact", 
      icon: Phone 
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 p-0 overflow-y-auto">
        <div className="flex flex-col min-h-full">
          {/* Header with Logo */}
          <div className="flex items-center justify-center py-6 px-4 border-b">
            <EmviLogo size="medium" showText={true} />
          </div>

          {/* Auth Buttons */}
          {!user && (
            <div className="px-4 py-4 space-y-2 border-b">
              <Button asChild className="w-full" size="lg">
                <Link to="/auth/signup" onClick={onClose}>
                  {t({ english: "Sign Up", vietnamese: "Đăng ký" })}
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link to="/auth/signin" onClick={onClose}>
                  {t({ english: "Sign In", vietnamese: "Đăng nhập" })}
                </Link>
              </Button>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 py-4">
            <div className="space-y-1 px-4">
              {menuItems.map((item) => {
                if (item.showWhen !== undefined && !item.showWhen) return null;
                
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-gray-100 hover:text-purple-600 rounded-lg transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="px-4 py-6 space-y-3 border-t mt-6">
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                <Link to="/post-job" onClick={onClose}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  {t({ english: "Post a Job for Free", vietnamese: "Đăng tin tuyển dụng miễn phí" })}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50" size="lg">
                <Link to="/post-salon" onClick={onClose}>
                  <Store className="h-4 w-4 mr-2" />
                  {t({ english: "Post Your Salon", vietnamese: "Đăng tin Salon" })}
                </Link>
              </Button>
            </div>
          </nav>

          {/* Language Switcher */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={handleLanguageToggle}
              className="w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              {language === 'en' ? 'Tiếng Việt' : 'English'}
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 text-center text-xs text-gray-500 border-t">
            Inspired by Sunshine ☀️
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
