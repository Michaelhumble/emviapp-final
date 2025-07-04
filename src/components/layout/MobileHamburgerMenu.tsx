
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Menu, Home, Briefcase, Building2, Users, MessageSquare, User, Phone, Info } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHamburgerMenu = ({ isOpen, onClose }: MobileHamburgerMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthAction = (action: string) => {
    setIsMenuOpen(false);
    onClose();
    if (action === 'signOut') {
      signOut();
    } else {
      navigate(`/auth/${action}`);
    }
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    onClose();
    navigate(path);
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Building2, label: 'Salons', path: '/salons' },
    { icon: Users, label: 'Artists', path: '/artists' },
    { icon: MessageSquare, label: 'Community', path: '/community' },
    { icon: User, label: 'Dashboard', path: '/dashboard' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-lg shadow-2xl z-50 flex flex-col"
              style={{ maxHeight: '35vh', minHeight: '300px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-8 w-8 hover:bg-gray-100/50 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-50/80 transition-colors duration-200 text-gray-700 hover:text-gray-900 text-left"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 space-y-2">
                  <Button
                    onClick={() => handleNavigation('/post-job')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2.5 rounded-lg shadow-sm"
                  >
                    Post a Job
                  </Button>
                  
                  <Button
                    onClick={() => handleNavigation('/sell-salon')}
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50/80 text-sm py-2.5 rounded-lg"
                  >
                    Sell Salon
                  </Button>
                </div>
              </nav>

              {/* Auth Section */}
              <div className="p-4 border-t border-gray-100/50 bg-gray-50/30">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-xs text-gray-600 px-1">
                      Signed in as {user.email}
                    </div>
                    <Button
                      onClick={() => handleAuthAction('signOut')}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 text-sm py-2.5 rounded-lg"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAuthAction('signin')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-lg"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleAuthAction('signup')}
                      variant="outline"
                      className="w-full border-gray-200 hover:bg-gray-50 text-sm py-2.5 rounded-lg"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
                
                {/* Credit */}
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500">Inspired by Sunshine ☀️</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHamburgerMenu;
