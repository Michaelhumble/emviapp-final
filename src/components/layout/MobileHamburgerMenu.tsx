
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2, Heart, Info, Phone } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileHamburgerMenu = ({ isOpen, onClose }: MobileHamburgerMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = (action: string) => {
    onClose();
    if (action === 'signOut') {
      signOut();
    } else {
      navigate(`/auth/${action}`);
    }
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: Heart, label: 'Community', href: '/community' },
    { icon: User, label: 'Dashboard', href: '/dashboard' },
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-80 bg-white shadow-2xl z-50 min-h-[75vh] flex flex-col justify-between py-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-6 py-4">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="px-6">
              {/* CTA Buttons */}
              <div className="mb-6 space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  onClick={onClose}
                >
                  <Link to="/post-job">Post a Job</Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50"
                  onClick={onClose}
                >
                  <Link to="/sell-salon">Sell Salon</Link>
                </Button>
              </div>

              {/* Auth Section */}
              <div className="mb-4 p-4 border-t border-gray-100 bg-gray-50 rounded-lg">
                {user ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Signed in as {user.email}
                    </div>
                    <Button
                      onClick={() => handleAuthAction('signOut')}
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleAuthAction('signin')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleAuthAction('signup')}
                      variant="outline"
                      className="w-full border-gray-200 hover:bg-gray-50"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>

              {/* Credit */}
              <div className="text-center">
                <p className="text-xs text-gray-400">
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
