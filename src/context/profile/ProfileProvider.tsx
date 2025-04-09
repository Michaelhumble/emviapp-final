
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import RoleDebugger from '@/components/debug/RoleDebugger';

export const ProfileContext = createContext({});

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { user, userProfile } = useAuth();
  const [showDebugger, setShowDebugger] = useState(false);
  
  // Enable the debugger with a keyboard shortcut (Shift + Alt + D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'D') {
        setShowDebugger(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Also check for URL parameter to enable debugger
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'role') {
      setShowDebugger(true);
    }
  }, []);
  
  // Define context value (we'll expand this later)
  const contextValue = {};

  return (
    <ProfileContext.Provider value={contextValue}>
      {showDebugger && <RoleDebugger />}
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
