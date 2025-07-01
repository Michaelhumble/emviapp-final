
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, UserPlus, LogIn, Home, Users, Building, Briefcase, MessageSquare, Info, Phone, LayoutDashboard, Plus, Store } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { setLanguagePreference, getLanguagePreference } from '@/utils/languagePreference';
import Logo from '@/components/ui/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { t, currentLanguage } = useTranslation();

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    window.location.reload();
  };

  const currentPath = location.pathname + location.search;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header with centered logo */}
          <SheetHeader className="px-4 py-6 border-b border-gray-100">
            <div className="flex justify-center items-center">
              <Logo size="medium" showText={true} />
            </div>
          </SheetHeader>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* CTA Buttons */}
            <div className="space-y-2 mb-6">
              <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium h-11">
                <Link to="/post-job" onClick={onClose}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t({
                    english: "Post a Job for Free",
                    vietnamese: "Đăng Việc Miễn Phí"
                  })}
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium h-11">
                <Link to="/posting/salon" onClick={onClose}>
                  <Store className="h-4 w-4 mr-2" />
                  {t({
                    english: "Post Your Salon",
                    vietnamese: "Đăng Bán Tiệm"
                  })}
                </Link>
              </Button>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-2 mb-6">
              {!user ? (
                <>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium h-10">
                    <Link to={`/auth/signup?redirect=${encodeURIComponent(currentPath)}`} onClick={onClose}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t({
                        english: "Sign Up",
                        vietnamese: "Đăng Ký"
                      })}
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-medium h-10">
                    <Link to="/auth/signin" onClick={onClose}>
                      <LogIn className="h-4 w-4 mr-2" />
                      {t({
                        english: "Sign In",
                        vietnamese: "Đăng Nhập"
                      })}
                    </Link>
                  </Button>
                </>
              ) : (
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium h-10">
                  <Link to="/dashboard" onClick={onClose}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    {t({
                      english: "Dashboard",
                      vietnamese: "Bảng Điều Khiển"
                    })}
                  </Link>
                </Button>
              )}
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-6">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Home className="h-4 w-4 mr-3" />
                {t({
                  english: "Home",
                  vietnamese: "Trang Chủ"
                })}
              </Link>

              <Link
                to="/artists"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Users className="h-4 w-4 mr-3" />
                {t({
                  english: "Artists",
                  vietnamese: "Thợ Làm Nail"
                })}
              </Link>

              <Link
                to="/salons"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Building className="h-4 w-4 mr-3" />
                {t({
                  english: "Salons",
                  vietnamese: "Tiệm Nail"
                })}
              </Link>

              <Link
                to="/jobs"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Briefcase className="h-4 w-4 mr-3" />
                {t({
                  english: "Jobs",
                  vietnamese: "Việc Làm"
                })}
              </Link>

              <Link
                to="/community"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                {t({
                  english: "Community",
                  vietnamese: "Cộng Đồng"
                })}
              </Link>

              <Link
                to="/about"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Info className="h-4 w-4 mr-3" />
                {t({
                  english: "About",
                  vietnamese: "Giới Thiệu"
                })}
              </Link>

              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center w-full px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
              >
                <Phone className="h-4 w-4 mr-3" />
                {t({
                  english: "Contact",
                  vietnamese: "Liên Hệ"
                })}
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentLanguage === 'en'
                      ? 'bg-purple-100 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('vi')}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentLanguage === 'vi'
                      ? 'bg-purple-100 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-center text-xs bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
