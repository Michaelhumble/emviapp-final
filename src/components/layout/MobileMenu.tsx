
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const auth = useAuth?.();
  const user = auth?.user;
  const signOut = auth?.signOut;
  const { t, isVietnamese, toggleLanguage, currentLanguage } = useTranslation();

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💅</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Emvi.App
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[80vh]">
            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Home className="h-5 w-5" />
                <span>{t({ english: "Dashboard", vietnamese: "Trang chủ" })}</span>
              </Link>

              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Home className="h-5 w-5" />
                <span>{t({ english: "Home", vietnamese: "Trang chủ" })}</span>
              </Link>

              <Link
                to="/artists"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Users className="h-5 w-5" />
                <span>{t({ english: "Artists", vietnamese: "Nghệ sĩ" })}</span>
              </Link>

              <Link
                to="/salons"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Building2 className="h-5 w-5" />
                <span>{t({ english: "Salons", vietnamese: "Salon" })}</span>
              </Link>

              <Link
                to="/jobs"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <Briefcase className="h-5 w-5" />
                <span>{t({ english: "Jobs", vietnamese: "Việc làm" })}</span>
              </Link>

              <Link
                to="/community"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <MessageSquare className="h-5 w-5" />
                <span>{t({ english: "Community", vietnamese: "Cộng đồng" })}</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <span className="text-gray-500">ℹ️</span>
                <span>{t({ english: "About", vietnamese: "Giới thiệu" })}</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <span className="text-gray-500">📞</span>
                <span>{t({ english: "Contact", vietnamese: "Liên hệ" })}</span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Link
                to="/post-job"
                className="block w-full"
                onClick={onClose}
              >
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  {t({ english: "Post a Job for Free", vietnamese: "Đăng việc miễn phí" })}
                </Button>
              </Link>

              <Link
                to="/post-salon"
                className="block w-full"
                onClick={onClose}
              >
                <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                  {t({ english: "Post Your Salon", vietnamese: "Đăng salon của bạn" })}
                </Button>
              </Link>

              {user && signOut && (
                <button
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-red-500 py-2 px-3 text-left rounded-lg hover:bg-red-50 transition-colors"
                >
                  {t({ english: "Sign Out", vietnamese: "Đăng xuất" })}
                </button>
              )}
            </div>

            {/* Language Toggle */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleLanguageToggle}
                className="w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {currentLanguage === 'en' ? 'English' : 'Tiếng Việt'}
              </button>
              <p className="text-xs text-gray-400 text-center mt-1">
                {t({ english: "Inspired by Sunshine ☀️", vietnamese: "Lấy cảm hứng từ Sunshine ☀️" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
