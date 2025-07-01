
import React, { useState } from 'react';
import { Menu, X, Home, Users, Briefcase, MessageCircle, Info, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { setLanguagePreference, getLanguagePreference } from '@/utils/languagePreference';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();

  // Use external state if provided, otherwise use internal state
  const isMenuOpen = isOpen !== undefined ? isOpen : internalOpen;
  const handleClose = onClose || (() => setInternalOpen(false));
  const handleOpen = () => {
    if (isOpen === undefined) {
      setInternalOpen(true);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    navigate('/');
  };

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    window.location.reload();
  };

  const menuItems = [
    { icon: Home, label: t({ english: 'Home', vietnamese: 'Trang Chủ' }), path: '/' },
    { icon: Users, label: t({ english: 'Artists', vietnamese: 'Nghệ Sĩ' }), path: '/artists' },
    { icon: Briefcase, label: t({ english: 'Salons', vietnamese: 'Salon' }), path: '/salons' },
    { icon: Briefcase, label: t({ english: 'Jobs', vietnamese: 'Việc Làm' }), path: '/jobs' },
    { icon: MessageCircle, label: t({ english: 'Community', vietnamese: 'Cộng Đồng' }), path: '/community' },
    { icon: Info, label: t({ english: 'About', vietnamese: 'Giới Thiệu' }), path: '/about' },
    { icon: Mail, label: t({ english: 'Contact', vietnamese: 'Liên Hệ' }), path: '/contact' },
  ];

  return (
    <Sheet open={isMenuOpen} onOpenChange={isOpen === undefined ? setInternalOpen : undefined}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={handleOpen}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[300px] flex flex-col">
        {/* Logo at top - centered */}
        <div className="flex justify-center py-6 border-b border-gray-100">
          <EmviLogo size="medium" showText={true} />
        </div>

        {/* Auth Buttons */}
        {!user && (
          <div className="flex flex-col gap-3 py-4 border-b border-gray-100">
            <Button 
              asChild 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleClose}
            >
              <Link to="/sign-up">
                {t({ english: 'Sign Up', vietnamese: 'Đăng Ký' })}
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={handleClose}
            >
              <Link to="/sign-in">
                {t({ english: 'Sign In', vietnamese: 'Đăng Nhập' })}
              </Link>
            </Button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 py-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleClose}
                className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <Button 
              onClick={() => {
                handleClose();
                navigate(user ? '/post-job' : '/sign-in');
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {t({ english: 'Post a Job for Free', vietnamese: 'Đăng Tin Miễn Phí' })}
            </Button>
            
            <Button 
              onClick={() => {
                handleClose();
                navigate(user ? '/post-salon' : '/sign-in');
              }}
              variant="outline" 
              className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              {t({ english: 'Post Your Salon', vietnamese: 'Đăng Salon' })}
            </Button>

            {user && (
              <Button 
                onClick={() => {
                  handleClose();
                  navigate('/dashboard');
                }}
                variant="outline" 
                className="w-full"
              >
                {t({ english: 'Dashboard', vietnamese: 'Bảng Điều Khiển' })}
              </Button>
            )}

            {user && (
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                className="w-full text-gray-600"
              >
                {t({ english: 'Sign Out', vietnamese: 'Đăng Xuất' })}
              </Button>
            )}
          </div>
        </nav>

        {/* Language Switcher */}
        <div className="py-4 border-t border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                currentLanguage === 'en'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('vi')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                currentLanguage === 'vi'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 text-center text-sm text-gray-500 border-t border-gray-100">
          Inspired by Sunshine ☀️
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
