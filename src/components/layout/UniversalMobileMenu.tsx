import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Menu, Home, Briefcase, Users, MessageSquare, User, Building2, Info, Phone, Sparkles, Scissors, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { getAuthUIState } from './navbar/AuthButtons';
import { NAV_ITEMS } from '@/config/nav.config';
import { MOBILE_LAYOUT } from '@/utils/mobileLayoutManager';

const UniversalMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const authState = useAuth();
  const { user, signOut, userProfile, userRole } = authState;
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const uiState = getAuthUIState(authState);

  // Force close menu on any route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open - simplified approach
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        left: 0;
        right: 0;
        overflow: hidden;
        height: 100vh;
      `;
      return () => {
        document.body.style.cssText = '';
        // Only restore meaningful scroll positions
        if (scrollY > 50) {
          window.scrollTo(0, scrollY);
        }
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAuthAction = async (action: string) => {
    setIsOpen(false);
    if (action === 'signOut') {
      try {
        await signOut();
      } catch (error) {
        console.error('Sign out error:', error);
        window.location.href = '/';
      }
    } else {
      navigate(`/auth/${action}`);
    }
  };

  const menuItems = NAV_ITEMS.filter(i => i.location === 'top' || i.location === 'drawer')
    .filter(i => uiState.isAuthenticated ? true : !(i.roles && i.roles.length));

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden min-w-[44px] min-h-[44px] touch-manipulation hover:bg-gray-100/80"
        onClick={() => setIsOpen(true)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Menu Overlay & Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={overlayRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              style={{ 
                zIndex: MOBILE_LAYOUT.Z_INDEX.MOBILE_MENU_BACKDROP,
                touchAction: 'none'
              }}
              onClick={handleClose}
              onTouchEnd={handleClose}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'tween',
                duration: 0.25,
                ease: 'easeOut'
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col"
              style={{ 
                zIndex: MOBILE_LAYOUT.Z_INDEX.MOBILE_MENU_PANEL,
                height: '100dvh',
                touchAction: 'manipulation'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center space-x-3">
                  <Logo size="small" showText={true} />
                  {uiState.isAuthenticated && userProfile && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={userProfile?.avatar_url || undefined} 
                          alt={userProfile?.full_name || userProfile?.salon_name || 'Profile'} 
                        />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                          {(userProfile?.full_name || userProfile?.salon_name || 'U').charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium text-gray-900 truncate max-w-24">
                          {userProfile?.full_name || userProfile?.salon_name || 'User'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="min-w-[44px] min-h-[44px] hover:bg-white/60"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-3 bg-gradient-to-b from-purple-50/50 to-transparent">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                >
                  <Link to="/post-job" onClick={handleClose}>
                    Post a Job
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full border-gray-200 hover:bg-gray-50"
                >
                  <Link to="/sell-salon" onClick={handleClose}>
                    Post Your Salon
                  </Link>
                </Button>
              </div>

              {/* Auth Section */}
              <div className="px-4 pb-4">
                {!uiState.showAuth ? (
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-gray-200 animate-pulse rounded-md" />
                    <div className="w-full h-8 bg-gray-200 animate-pulse rounded-md" />
                  </div>
                ) : uiState.isAuthenticated ? (
                  <div className="space-y-2">
                    <Link 
                      to="/dashboard" 
                      onClick={handleClose}
                      className="block w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors"
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

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto border-t border-gray-100">
                <nav className="p-4">
                  <div className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.key}
                        to={item.path}
                        onClick={handleClose}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900 min-h-[44px] touch-manipulation"
                      >
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
    </>
  );
};

export default UniversalMobileMenu;