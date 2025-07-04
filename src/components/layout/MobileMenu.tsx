
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import EmviLogo from '@/components/branding/EmviLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

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
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Close Button */}
            <div className="flex items-center justify-end p-4">
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
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* EmviApp Logo - Centered at top */}
              <div className="flex justify-center mb-8">
                <EmviLogo size="medium" showText={true} />
              </div>

              {/* Menu Items in exact order */}
              <div className="space-y-4">
                {/* Post a Job Button */}
                <Button
                  onClick={() => handleNavigation('/post-job')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  Post a Job
                </Button>

                {/* Sell Your Salon Button */}
                <Button
                  onClick={() => handleNavigation('/sell-salon')}
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50"
                >
                  Sell Your Salon
                </Button>

                {/* Navigation Links */}
                <div className="space-y-2 mt-6">
                  <Link
                    to="/"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Home
                  </Link>

                  <Link
                    to="/jobs"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Jobs
                  </Link>

                  <Link
                    to="/salons"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Salons
                  </Link>

                  <Link
                    to="/artists"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Artists
                  </Link>

                  <Link
                    to="/freelancers"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Community
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/about"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    About
                  </Link>

                  <Link
                    to="/contact"
                    onClick={onClose}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Auth Section - Always visible at bottom */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 text-center">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
