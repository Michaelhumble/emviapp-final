
import React from 'react';
import { PremiumAuthModal } from '@/components/auth/PremiumAuthModal';
import { useAuthModal } from '@/context/auth/AuthModalProvider';

const GlobalAuthModal = () => {
  const { isOpen, closeModal, mode } = useAuthModal();
  
  return (
    <PremiumAuthModal 
      open={isOpen} 
      onOpenChange={closeModal} 
      defaultMode={mode}
    />
  );
};

export default GlobalAuthModal;
