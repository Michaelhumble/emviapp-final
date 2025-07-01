
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, LogOut, Globe, Menu } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen: propIsOpen, 
  onClose: propOnClose 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  // Use props if provided, otherwise use internal state
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const onClose = propOnClose || (() => setInternalIsOpen(false));
  const onOpen = () => setInternalIsOpen(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  return (
    <>
      {/* Mobile Menu Button - Only show if using internal state */}
      {propIsOpen === undefined && (
        <button
          onClick={onOpen}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-3">
              <Link 
                to="/" 
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 font-medium">Home</span>
              </Link>

              <Link 
                to="/jobs" 
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 font-medium">Jobs</span>
              </Link>

              <Link 
                to="/salons" 
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 font-medium">Salons</span>
              </Link>

              <Link 
                to="/artists" 
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 font-medium">Artists</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
              >
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="text-gray-900 font-medium">
                  {currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
                </span>
              </button>

              {/* Divider */}
              {user && <div className="border-t border-gray-200/50 my-3" />}

              {/* User Actions */}
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">Dashboard</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="h-5 w-5 text-red-600" />
                    <span className="text-red-600 font-medium">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth/sign-in" 
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-gray-900 font-medium">Sign In</span>
                  </Link>

                  <Link 
                    to="/auth/sign-up" 
                    onClick={onClose}
                    className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
