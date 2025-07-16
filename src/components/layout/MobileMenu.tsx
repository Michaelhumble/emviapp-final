
/**
 * 📱 MOBILE MENU - IMMEDIATE AUTH STATE SYNC
 * 
 * CRITICAL: Uses centralized auth context for real-time updates
 * NO local auth state - all state comes from AuthProvider
 * 
 * Features:
 * - Immediate menu updates when auth state changes
 * - Proper loading states during auth transitions
 * - Menu stays open until user manually closes it
 */

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
  const { user, signOut, userProfile, userRole, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // DO NOT auto-close menu on auth state changes
  // This was causing the menu to close every time auth context updates
  // Menu should only close via user action (close button, navigation, backdrop click)

  const handleAuthAction = async (action: string) => {
    if (action === 'signOut') {
      onClose(); // Close menu immediately before sign out
      try {
        await signOut();
      } catch (error) {
        console.error("Mobile sign out error:", error);
        // Force navigation even if error occurs
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } else {
      // For sign in/up, keep menu open until navigation completes
      // This prevents menu from flashing closed/open during auth
      navigate(`/auth/${action}`);
      // Close after navigation starts
      setTimeout(onClose, 100);
    }
  };

  // Define menu items based on user authentication (use isSignedIn for consistency)
  const menuItems = isSignedIn ? [
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
            {/* Header with Profile Integration */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-3 flex-1">
                <Logo size="small" showText={true} />
                {isSignedIn && userProfile && (
                  <div className="flex items-center space-x-2 ml-auto mr-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={userProfile?.avatar_url || undefined} 
                        alt={userProfile?.full_name || userProfile?.salon_name || 'Profile'} 
                      />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                        {(userProfile?.full_name || userProfile?.salon_name || 'U').charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-xs font-medium text-gray-900 truncate max-w-20">
                        {userProfile?.full_name || userProfile?.salon_name || 'User'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 hover:bg-gray-100 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Action Buttons Section - Moved to top */}
            <div className="p-4 space-y-2 flex-shrink-0">
              <Button
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Link to="/post-job" onClick={onClose}>
                  Post a Job
                </Link>
              </Button>
              
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray-50"
              >
                <Link to="/sell-salon" onClick={onClose}>
                  Post Your Salon
                </Link>
              </Button>
            </div>

            {/* Authentication Section - Moved to top */}
            <div className="px-4 pb-4 flex-shrink-0">
              {isSignedIn ? (
                <div className="space-y-2">
                  <Link 
                    to="/dashboard" 
                    onClick={onClose}
                    className="block w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-1"
                  >
                    View Dashboard →
                  </Link>
                  <Button
                    onClick={() => handleAuthAction('signOut')}
                    variant="outline"
                    size="sm"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => handleAuthAction('signin')}
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleAuthAction('signup')}
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-200 hover:bg-gray-50"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation Items - Now has more space */}
            <div className="flex-1 overflow-y-auto border-t border-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
