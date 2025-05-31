
import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut, Globe, Briefcase, Building } from 'lucide-react';
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

          {/* Action Buttons */}
          <div className="p-4 space-y-3 border-b">
            <Link
              to="/posting/job"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md font-medium text-sm"
            >
              <Briefcase className="h-4 w-4" />
              Post a Job
            </Link>
            
            <Link
              to="/posting/salon"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full border border-purple-600 text-purple-600 py-2.5 px-4 rounded-lg hover:bg-purple-50 transition-colors shadow-md font-medium text-sm"
            >
              <Building className="h-4 w-4" />
              Post Your Salon
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/artists"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              Find Artists
            </Link>
            <Link
              to="/jobs"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              Browse Jobs
            </Link>
            <Link
              to="/salons"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Building className="h-5 w-5" />
              Salons for Sale
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="border-t p-4 space-y-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                  className="block w-full text-center px-4 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Footer */}
            <div className="text-center pt-2 pb-1">
              <p className="text-xs text-gray-500">Inspired by Sunshine ☀️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
