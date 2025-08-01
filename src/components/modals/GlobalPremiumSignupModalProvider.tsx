import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import PremiumSignupModal from './PremiumSignupModal';

/**
 * Global Modal Provider that shows premium signup modal to unauthenticated users
 * Modal shows on every visit/reload until user signs up
 */
const GlobalPremiumSignupModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn, loading } = useAuth();

  useEffect(() => {
    // Don't show modal while auth is loading
    if (loading) return;

    // If user is signed in, never show modal
    if (isSignedIn) {
      setShowModal(false);
      return;
    }

    // If user is not signed in, show modal on every visit/reload
    if (!isSignedIn) {
      // Small delay to ensure page has loaded
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, loading]);

  const handleCloseModal = () => {
    setShowModal(false);
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