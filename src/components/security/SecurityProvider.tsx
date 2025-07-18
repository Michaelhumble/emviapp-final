import React, { createContext, useContext, useEffect, useState } from 'react';
import { enforceHTTPS, validateSession } from '@/utils/security';
import { supabaseBypass } from '@/types/supabase-bypass';

interface SecurityContextType {
  isSessionValid: boolean;
  checkRateLimit: (endpoint: string) => Promise<boolean>;
  refreshSecurity: () => Promise<void>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    // Enforce HTTPS in production
    enforceHTTPS();

    // REMOVED: Aggressive session validation that was destroying sessions
    // Instead, trust Supabase's built-in session management
    setIsSessionValid(true); // Default to valid

    // Set up session monitoring - TRUST SUPABASE EVENTS ONLY
    const { data: { subscription } } = supabaseBypass.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 [SECURITY] Auth event:', event, 'Session exists:', !!session);
        setIsSessionValid(!!session);
        
        // NO MORE FORCED VALIDATION - trust Supabase state changes
      }
    );

    // REMOVED: Destructive 5-minute session validation interval
    // This was the main cause of users being signed out unexpectedly

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkRateLimit = async (endpoint: string): Promise<boolean> => {
    try {
      const { data, error } = await supabaseBypass.rpc('check_rate_limit' as any, {
        p_endpoint: endpoint,
        p_max_requests: 100,
        p_window_minutes: 60
      });
      
      if (error) {
        console.error('Rate limit check failed:', error);
        return false;
      }
      
      return data;
    } catch (error) {
      console.error('Rate limit service error:', error);
      return false;
    }
  };

  const refreshSecurity = async (): Promise<void> => {
    // REMOVED: Destructive validateSession call
    // Trust current auth state instead of forcing validation
    console.log('🔐 [SECURITY] Security refresh requested - trusting current state');
  };

  const value: SecurityContextType = {
    isSessionValid,
    checkRateLimit,
    refreshSecurity
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};