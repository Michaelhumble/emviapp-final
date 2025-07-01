
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Home, 
  Palette, 
  Building2, 
  Briefcase, 
  Users, 
  Info, 
  Phone,
  UserPlus,
  LogIn,
  X
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { setLanguagePreference, getLanguagePreference } from '@/utils/languagePreference';
import EmviLogo from '@/components/branding/EmviLogo';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const currentLanguage = getLanguagePreference();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const currentPath = location.pathname;

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Home', path: '/', icon: Home },
    { name: 'Artists', path: '/artists', icon: Palette },
    { name: 'Salons', path: '/salons', icon: Building2 },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    // Force a page refresh to apply language changes
    window.location.reload();
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu} />
      
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center justify-center flex-1">
              <EmviLogo size="medium" showText={true} />
            </div>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col">
            {/* Auth Buttons (when logged out) */}
            {!user && (
              <div className="p-4 space-y-3 border-b">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3"
                  onClick={closeMenu}
                >
                  <Link to={`/auth/signup?redirect=${encodeURIComponent(currentPath)}`}>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-2 border-gray-300 hover:border-gray-400 py-3"
                  onClick={closeMenu}
                >
                  <Link to={`/auth/signin?redirect=${encodeURIComponent(currentPath)}`}>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Link>
                </Button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-1 py-4">
              <div className="space-y-1 px-4">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="px-4 mt-6 space-y-3">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-3"
                  onClick={closeMenu}
                >
                  <Link to="/posting/job">
                    Post a Job for Free
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-2 border-purple-300 text-purple-600 hover:border-purple-400 hover:text-purple-700 py-3"
                  onClick={closeMenu}
                >
                  <Link to="/posting/salon">
                    Post Your Salon
                  </Link>
                </Button>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="px-4 py-4 border-t">
              <div className="mb-3">
                <span className="text-sm font-medium text-gray-700">Language</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentLanguage === 'en'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('vi')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentLanguage === 'vi'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t">
              <div className="text-center">
                <span className="text-sm bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
                  Inspired by Sunshine ☀️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
