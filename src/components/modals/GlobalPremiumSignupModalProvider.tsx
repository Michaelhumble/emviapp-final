import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useLocation } from 'react-router-dom';
import PremiumSignupModal from './PremiumSignupModal';
import { ENABLE_SIGNUP_MODAL } from '@/lib/env';

/**
 * Global Modal Provider that shows premium signup modal to unauthenticated users
 * Modal shows based on feature flag and various conditions
 */
const GlobalPremiumSignupModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn, loading } = useAuth();
  const location = useLocation();

  // Helper function to detect if running as PWA
  const isPWA = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    );
  };

  // Helper function to check if we should never show modal on this route
  const isRestrictedRoute = (pathname: string) => {
    const restrictedRoutes = ['/signup', '/login', '/jobs/post', '/book', '/press', '/auth/'];
    return restrictedRoutes.some(route => pathname.startsWith(route));
  };

  useEffect(() => {
    // Feature flag check - don't show if disabled
    if (!ENABLE_SIGNUP_MODAL) {
      setShowModal(false);
      return;
    }

    // Don't show modal while auth is loading
    if (loading) return;

    // If user is signed in, never show modal
    if (isSignedIn) {
      setShowModal(false);
      return;
    }

    // Don't show in PWA mode
    if (isPWA()) {
      setShowModal(false);
      return;
    }

    // Don't show on restricted routes
    if (isRestrictedRoute(location.pathname)) {
      setShowModal(false);
      return;
    }

    // Check if user has dismissed modal recently
    const dismissKey = 'emvi.dismiss_signup_modal';
    const dismissedAt = localStorage.getItem(dismissKey);
    if (dismissedAt) {
      const dismissTime = new Date(dismissedAt);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      if (dismissTime > thirtyDaysAgo) {
        setShowModal(false);
        return;
      }
    }

    // If all conditions pass and feature flag is enabled, show modal with delay
    if (!isSignedIn && ENABLE_SIGNUP_MODAL) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, loading, location.pathname]);

  const handleCloseModal = () => {
    setShowModal(false);
    // Mark as dismissed for 30 days
    const dismissKey = 'emvi.dismiss_signup_modal';
    localStorage.setItem(dismissKey, new Date().toISOString());
  };

  return (
    <>
      {children}
      <PremiumSignupModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default GlobalPremiumSignupModalProvider;