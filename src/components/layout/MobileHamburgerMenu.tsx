
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Briefcase, Building2, Users, MessageSquare, LayoutDashboard, Info, Phone } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHamburgerMenu = ({ isOpen, onClose }: MobileHamburgerMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async (action: string) => {
    onClose();
    if (action === 'signOut') {
      await signOut();
      navigate('/');
    } else {
      navigate(`/auth/${action}`);
    }
  };

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: MessageSquare, label: 'Community', href: '/community' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Info, label: 'About', href: '/about' },
    { icon: Phone, label: 'Contact', href: '/contact' },
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-[35vh] max-h-[400px] w-80 bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col rounded-br-2xl border-r border-b border-gray-200/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100/80">
              <h2 className="text-lg font-semibold text-gray-800 font-serif">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-gray-100/80 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Items - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-1 mb-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50/80 transition-colors duration-200 text-gray-700 hover:text-gray-900 text-left"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="space-y-2 mb-4">
                <Button
                  onClick={() => handleNavigation('/post-job')}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md text-sm py-2"
                >
                  Post a Job
                </Button>
                
                <Button
                  onClick={() => handleNavigation('/sell-salon')}
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50/80 text-sm py-2"
                >
                  Sell Salon
                </Button>
              </div>
            </div>

            {/* Auth Section */}
            <div className="p-4 border-t border-gray-100/80 bg-gray-50/50">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-600 mb-2">
                    Signed in as {user.email}
                  </div>
                  <Button
                    onClick={() => handleAuthAction('signOut')}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 text-sm py-2"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => handleAuthAction('signin')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleAuthAction('signup')}
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50 text-sm py-2"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              
              {/* Credit */}
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500">
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

export default MobileHamburgerMenu;
