
import React from 'react';
import { Link } from 'react-router-dom';
import { X, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { useLanguage } from '@/context/LanguageContext';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isSignedIn, signOut } = useAuth();
  const { isVietnamese, toggleLanguage } = useLanguage();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 py-6 space-y-6">
            {/* Primary CTAs */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/posting/job" onClick={onClose}>
                  {isVietnamese ? 'Đăng Việc Miễn Phí' : 'Post a Job for Free'}
                </Link>
              </Button>
              
              <div onClick={onClose}>
                <PostYourSalonButton 
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              <Link 
                to="/explore/artists" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Khám Phá Nghệ Sĩ' : 'Explore Artists'}
              </Link>
              <Link 
                to="/explore/salons" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Khám Phá Salon' : 'Explore Salons'}
              </Link>
              <Link 
                to="/jobs" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Việc Làm' : 'Jobs'}
              </Link>
              <Link 
                to="/booths" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Thuê Booth' : 'Booth Rentals'}
              </Link>
              <Link 
                to="/supplies" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Vật Tư' : 'Supplies'}
              </Link>
              <Link 
                to="/salons" 
                onClick={onClose}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {isVietnamese ? 'Salon Bán' : 'Salons for Sale'}
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="border-t pt-6 space-y-3">
              {isSignedIn ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={onClose}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {isVietnamese ? 'Bảng Điều Khiển' : 'Dashboard'}
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={onClose}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {isVietnamese ? 'Hồ Sơ' : 'Profile'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isVietnamese ? 'Đăng Xuất' : 'Sign Out'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth?tab=signin" 
                    onClick={onClose}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {isVietnamese ? 'Đăng Nhập' : 'Sign In'}
                  </Link>
                  <Link 
                    to="/auth?tab=signup" 
                    onClick={onClose}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {isVietnamese ? 'Đăng Ký' : 'Sign Up'}
                  </Link>
                </>
              )}
            </div>

            {/* Language Switcher */}
            <div className="border-t pt-6">
              <button
                onClick={toggleLanguage}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Globe className="h-4 w-4 mr-2" />
                {isVietnamese ? 'English' : 'Tiếng Việt'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t">
            <p className="text-xs text-gray-500 text-center">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
