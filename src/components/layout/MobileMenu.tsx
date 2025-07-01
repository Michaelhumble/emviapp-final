
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { setLanguagePreference, getLanguagePreference } from '@/utils/languagePreference';
import {
  Home,
  Users,
  Building2,
  Briefcase,
  MessageSquare,
  Info,
  Phone,
  UserPlus,
  LogIn,
  User,
  LayoutDashboard,
  X
} from 'lucide-react';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguagePreference());

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    setCurrentLanguage(language);
    window.location.reload(); // Refresh to apply language change
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header with close button */}
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col h-full px-6 pb-6 overflow-y-auto">
        {/* Centered Logo */}
        <div className="flex flex-col items-center mb-8">
          <EmviLogo size="medium" showText={true} />
        </div>

        {/* Auth Buttons - Only show when logged out */}
        {!user && (
          <div className="space-y-3 mb-8">
            <Button 
              asChild
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl"
            >
              <Link to={`/auth/signup?redirect=${currentPath}`} onClick={onClose}>
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="w-full h-12 border-2 border-purple-200 hover:bg-purple-50 font-semibold rounded-xl"
            >
              <Link to={`/auth/signin?redirect=${currentPath}`} onClick={onClose}>
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3 mb-8">
          <Button 
            asChild
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl"
          >
            <Link to="/post-job" onClick={onClose}>
              Post a Job for Free
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="w-full h-12 border-2 border-orange-200 hover:bg-orange-50 font-semibold rounded-xl"
          >
            <Link to="/posting/salon" onClick={onClose}>
              Post Your Salon
            </Link>
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 mb-8">
          {user && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              {t({
                english: "Dashboard",
                vietnamese: "Bảng Điều Khiển"
              })}
            </Link>
          )}
          
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Home className="mr-3 h-5 w-5" />
            {t({
              english: "Home",
              vietnamese: "Trang Chủ"
            })}
          </Link>

          <Link
            to="/artists"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Users className="mr-3 h-5 w-5" />
            {t({
              english: "Artists",
              vietnamese: "Nghệ Sĩ"
            })}
          </Link>

          <Link
            to="/salons"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Building2 className="mr-3 h-5 w-5" />
            {t({
              english: "Salons",
              vietnamese: "Tiệm"
            })}
          </Link>

          <Link
            to="/jobs"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Briefcase className="mr-3 h-5 w-5" />
            {t({
              english: "Jobs",
              vietnamese: "Việc Làm"
            })}
          </Link>

          <Link
            to="/community"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            {t({
              english: "Community",
              vietnamese: "Cộng Đồng"
            })}
          </Link>

          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Info className="mr-3 h-5 w-5" />
            {t({
              english: "About",
              vietnamese: "Giới Thiệu"
            })}
          </Link>

          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
          >
            <Phone className="mr-3 h-5 w-5" />
            {t({
              english: "Contact",
              vietnamese: "Liên Hệ"
            })}
          </Link>

          {user && (
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center py-3 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
            >
              <User className="mr-3 h-5 w-5" />
              {t({
                english: "Profile",
                vietnamese: "Hồ Sơ"
              })}
            </Link>
          )}
        </nav>

        {/* Language Switcher */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                currentLanguage === 'en' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('vi')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                currentLanguage === 'vi' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 text-center">
          <p className="text-sm bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
            Inspired by Sunshine ☀️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
