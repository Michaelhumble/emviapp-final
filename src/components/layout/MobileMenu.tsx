
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2, Phone, Info } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';

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

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Users, label: 'Artists', href: '/artists' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: MessageSquare, label: 'Community', href: '/freelancers' },
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex-1 flex justify-center">
                <Logo size="small" showText={true} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Top Action Buttons */}
            <div className="p-6 border-b border-gray-100 space-y-3 flex-shrink-0">
              {/* Post Job and Salon Buttons */}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Link to="/post-job" onClick={onClose}>
                  Post Free Job
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray-50"
              >
                <Link to="/sell-salon" onClick={onClose}>
                  Post Your Salon
                </Link>
              </Button>

              {/* Auth Buttons - Now positioned under Post buttons */}
              {!user ? (
                <div className="space-y-2 pt-2">
                  <Button
                    onClick={() => handleAuthAction('signup')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => handleAuthAction('signin')}
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50"
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <div className="pt-2">
                  <Button
                    onClick={() => handleAuthAction('signOut')}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6 overflow-y-auto">
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

            {/* User Info (only if signed in) */}
            {user && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                <div className="text-sm text-gray-600">
                  Signed in as {user.email}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
