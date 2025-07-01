
import React from 'react';
import { X, Home, Palette, Building2, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isSignedIn, signOut } = useAuth();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-500">M</span>
          <span className="text-xl font-bold text-gray-900">Emvi.App</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* User Info */}
      {isSignedIn && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">S</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">salon1@yahoo.com</p>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <Link to="/dashboard" onClick={handleLinkClick}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="px-6"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Navigation Menu - Made scrollable */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
            onClick={handleLinkClick}
          >
            <Home className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {t({ english: "Home", vietnamese: "Trang Chủ" })}
            </span>
          </Link>

          <Link
            to="/artists"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
            onClick={handleLinkClick}
          >
            <Palette className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {t({ english: "Artists", vietnamese: "Nghệ Sĩ" })}
            </span>
          </Link>

          <Link
            to="/salons"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
            onClick={handleLinkClick}
          >
            <Building2 className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {t({ english: "Salons", vietnamese: "Tiệm" })}
            </span>
          </Link>

          <Link
            to="/jobs"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
            onClick={handleLinkClick}
          >
            <Briefcase className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {t({ english: "Jobs", vietnamese: "Việc Làm" })}
            </span>
          </Link>

          <Link
            to="/community"
            className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
            onClick={handleLinkClick}
          >
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">
              {t({ english: "Community", vietnamese: "Cộng Đồng" })}
            </span>
          </Link>

          <div className="border-t pt-4 space-y-4">
            <PostYourSalonButton
              variant="outline"
              className="w-full justify-start"
              onClose={handleLinkClick}
            />
            
            <Link
              to="/posting/job"
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              onClick={handleLinkClick}
            >
              <span className="text-gray-900 font-medium">
                {t({ english: "Post a Job", vietnamese: "Đăng Tuyển Dụng" })}
              </span>
            </Link>

            <Link
              to="/about"
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              onClick={handleLinkClick}
            >
              <span className="text-gray-900 font-medium">
                {t({ english: "About", vietnamese: "Giới Thiệu" })}
              </span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
              onClick={handleLinkClick}
            >
              <span className="text-gray-900 font-medium">
                {t({ english: "Contact", vietnamese: "Liên Hệ" })}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
