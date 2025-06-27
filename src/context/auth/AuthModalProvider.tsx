
import React, { createContext, useContext, useState } from 'react';

interface AuthModalContextType {
  isOpen: boolean;
  openModal: (mode?: 'signin' | 'signup') => void;
  closeModal: () => void;
  mode: 'signin' | 'signup';
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return context;
};

interface AuthModalProviderProps {
  children: React.ReactNode;
}

export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  const openModal = (defaultMode: 'signin' | 'signup' = 'signup') => {
    setMode(defaultMode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        mode
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
