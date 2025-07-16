import React, { createContext, useContext, useEffect, useState } from 'react';
import { enforceHTTPS, validateSession } from '@/utils/security';
import { supabase } from '@/integrations/supabase/client';

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

    // Initial session validation
    validateSession().then(setIsSessionValid);

    // Set up session monitoring
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsSessionValid(!!session);
        
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          validateSession().then(setIsSessionValid);
        }
      }
    );

    // Session validation interval (every 5 minutes)
    const sessionCheckInterval = setInterval(() => {
      validateSession().then(setIsSessionValid);
    }, 5 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(sessionCheckInterval);
    };
  }, []);

  const checkRateLimit = async (endpoint: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit', {
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
    const sessionValid = await validateSession();
    setIsSessionValid(sessionValid);
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