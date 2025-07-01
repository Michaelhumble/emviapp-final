
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, LogIn, Home, Users, Building2, Briefcase, MessageSquare, Info, Phone, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { setLanguagePreference } from '@/utils/languagePreference';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { currentLanguage, t } = useTranslation();
  const currentPath = location.pathname;

  const handleLanguageChange = (language: 'en' | 'vi') => {
    setLanguagePreference(language);
    window.location.reload();
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requireAuth: true },
    { name: 'Home', href: '/', icon: Home },
    { name: 'Artists', href: '/explore/artists', icon: Users },
    { name: 'Salons', href: '/explore/salons', icon: Building2 },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Community', href: '/community', icon: MessageSquare },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Menu */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header with Close Button */}
              <div className="flex justify-end p-4 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Logo Section - Centered */}
              <div className="flex justify-center py-4 border-b">
                <EmviLogo size="medium" showText={true} />
              </div>

              {/* Post Job and Salon Buttons */}
              <div className="px-4 py-3 space-y-2 border-b">
                <Link to="/post-job" onClick={onClose}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm py-2">
                    Post a Job for Free
                  </Button>
                </Link>
                <Link to="/post-salon" onClick={onClose}>
                  <Button variant="outline" className="w-full text-sm py-2">
                    Post Your Salon
                  </Button>
                </Link>
              </div>

              {/* Authentication Buttons - Only show when logged out */}
              {!user && (
                <div className="px-4 py-3 space-y-2 border-b">
                  <Link to={`/auth/signup?redirect=${currentPath}`} onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 text-sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                  <Link to={`/auth/login?redirect=${currentPath}`} onClick={onClose}>
                    <Button variant="outline" className="w-full font-medium py-3 text-sm">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-3">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    // Skip Dashboard if user is not authenticated
                    if (item.requireAuth && !user) return null;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-sm"
                      >
                        <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Language Switcher */}
              <div className="px-4 py-3 border-t">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentLanguage === 'en'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('vi')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentLanguage === 'vi'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t">
                <p className="text-center text-xs bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                  Inspired by Sunshine ☀️
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
