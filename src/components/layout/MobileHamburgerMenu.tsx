
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';

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
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: MessageSquare, label: 'Community', href: '/freelancers' },
    { icon: User, label: 'Dashboard', href: '/profile' },
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
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

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Logo */}
              <div className="p-6 border-b border-gray-100">
                <Logo size="medium" showText={true} />
              </div>

              {/* Navigation Items */}
              <nav className="p-6">
                <div className="space-y-2 mb-6">
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
                  
                  {/* Additional menu items */}
                  <Link
                    to="/about"
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                  >
                    <span className="font-medium">About</span>
                  </Link>
                  
                  <Link
                    to="/contact"
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
                  >
                    <span className="font-medium">Contact</span>
                  </Link>
                </div>

                {/* Auth Buttons - Moved higher for better visibility */}
                {!user && (
                  <div className="space-y-3 mb-6">
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

                {/* CTA Buttons */}
                <div className="space-y-3">
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
                    <Link to="/sell-salon">Sell Your Salon</Link>
                  </Button>
                </div>
              </nav>
            </div>

            {/* Auth Section - Only Sign Out for signed-in users */}
            {user && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
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
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileHamburgerMenu;
