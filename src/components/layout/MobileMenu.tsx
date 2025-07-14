
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2, Info, Phone } from 'lucide-react';
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

  const { userProfile, userRole } = useAuth();

  // Define menu items based on user authentication
  const menuItems = user ? [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: MessageSquare, label: 'Community', href: '/community' },
    { 
      icon: User, 
      label: userRole === 'artist' ? 'Artist Dashboard' : 'Dashboard', 
      href: '/dashboard' 
    },
    { icon: Info, label: 'About', href: '/about' },
    { icon: Phone, label: 'Contact', href: '/contact' },
  ] : [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Jobs', href: '/jobs' },
    { icon: Building2, label: 'Salons', href: '/salons' },
    { icon: MessageSquare, label: 'Community', href: '/community' },
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] md:hidden"
            onClick={onClose}
            style={{ backdropFilter: 'blur(8px)' }}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[10000] flex flex-col"
            style={{ 
              height: '100dvh', // Use dynamic viewport height for better mobile support
              overflowY: 'hidden' // Let the inner scroll container handle scrolling
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
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

            {/* Profile Card - Show only when authenticated */}
            {user && userProfile && (
              <div className="p-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={userProfile?.avatar_url || undefined} 
                      alt={userProfile?.full_name || userProfile?.salon_name || 'Profile'} 
                    />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {(userProfile?.full_name || userProfile?.salon_name || 'U').charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {userProfile?.full_name || userProfile?.salon_name || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {userProfile?.specialty || userRole || 'Member'}
                    </p>
                    <Link 
                      to="/dashboard" 
                      onClick={onClose}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View Dashboard →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items - Scrollable middle section */}
            <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <nav className="p-4">
                <div className="space-y-1">
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
            </div>

            {/* Action Buttons Section */}
            <div className="p-4 border-t border-gray-100 space-y-3 flex-shrink-0">
              {/* Post Job and Salon Buttons */}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Link to="/post-job" onClick={onClose}>
                  Post a Job
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
            </div>

            {/* Authentication Section - Always visible at bottom */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              {user ? (
                <Button
                  onClick={() => handleAuthAction('signOut')}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  Sign Out
                </Button>
              ) : (
                <div className="space-y-2">
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
