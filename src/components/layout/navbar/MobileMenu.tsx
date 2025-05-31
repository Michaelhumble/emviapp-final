
import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut, Globe } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { isVietnamese, toggleLanguage } = useTranslation();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/artists"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Find Artists
            </Link>
            <Link
              to="/jobs"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/salons"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Salons for Sale
            </Link>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                to="/posting/job"
                onClick={onClose}
                className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Post a Job
              </Link>
              
              <div onClick={onClose}>
                <PostYourSalonButton 
                  variant="outline"
                  className="w-full"
                />
              </div>
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="border-t p-4 space-y-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Globe className="h-5 w-5 mr-3" />
              {isVietnamese ? 'English' : 'Tiếng Việt'}
            </button>

            {/* Auth Actions */}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
