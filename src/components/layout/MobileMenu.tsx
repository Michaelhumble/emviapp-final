
/** PROTECTED: Do not modify without explicit approval. */

/**
 * 📱 MOBILE MENU - BULLETPROOF AUTH STATE SYNC
 * 
 * CRITICAL: Uses centralized auth context for real-time updates
 * NO local auth state - all state comes from AuthProvider
 * 
 * Features:
 * - Immediate menu updates when auth state changes
 * - Hydration-safe rendering
 * - Shared auth logic with desktop components
 * - Debug utilities for testing
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Home, Briefcase, Users, MessageSquare, User, Building2, Info, Phone, Sparkles, Scissors, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { getAuthUIState } from './navbar/AuthButtons';
import { NAV_ITEMS } from '@/config/nav.config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authState = useAuth();
  const { user, signOut, userProfile, userRole } = authState;
  
  const uiState = getAuthUIState(authState);
  
  // 🐛 DEBUG UTILITY: Expose mobile menu auth state for testing
  if (typeof window !== 'undefined') {
    (window as any).emviTestCheckMobileUI = () => ({
      ...uiState.debugInfo,
      menuType: 'mobile-menu',
      isOpen,
      userProfile: !!userProfile,
      userRole,
      currentPath: location.pathname,
      timestamp: new Date().toISOString()
    });
  }

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

  // 🎯 CONSISTENT MENU LOGIC: Use centralized config
  const menuItems = NAV_ITEMS.filter(i => i.location === 'top' || i.location === 'drawer')
    .filter(i => uiState.isAuthenticated ? true : !(i.roles && i.roles.length));

  // Close menu on route change to prevent stuck menu
  React.useEffect(() => {
    // Only close if menu is open and route actually changed
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // Removed onClose dependency to prevent re-trigger loops

  // Add ESC key handler to close menu
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent background scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md md:hidden"
            style={{ 
              zIndex: 9998, // Below menu panel
              backdropFilter: 'blur(8px)' 
            }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            style={{ 
              zIndex: 9999, // Highest priority
              height: '100dvh',
              minHeight: '100svh',
              overflowY: 'hidden'
            }}
          >
            {/* Header with Profile Integration */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-3 flex-1">
                <Logo size="small" showText={true} />
                {uiState.isAuthenticated && userProfile && (
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
                className="min-w-[44px] min-h-[44px] hover:bg-gray-100 flex-shrink-0 touch-manipulation"
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
              {!uiState.showAuth ? (
                // 🚨 HYDRATION GUARD: Show skeleton during initialization
                <div className="space-y-2">
                  <div className="w-full h-8 bg-gray-200 animate-pulse rounded-md" />
                  <div className="w-full h-8 bg-gray-200 animate-pulse rounded-md" />
                </div>
              ) : uiState.isAuthenticated ? (
                // ✅ AUTHENTICATED STATE: Show dashboard link and sign out
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
                // ❌ UNAUTHENTICATED STATE: Show sign in and sign up
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
                      key={item.key}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 min-h-[44px] touch-manipulation"
                    >
                      {/* Keep existing icon layout – optional mapping by key */}
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
