
import { useCallback, useContext, createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useSession } from './hooks/useSession';
import { useUserProfile } from './hooks/useUserProfile';
import { UserProfile, UserRole } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  isNewUser: boolean;
  clearIsNewUser: () => void;
  refreshUserProfile: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<any>; 
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Add this separately to avoid circular imports
export const useSignOut = () => {
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      window.localStorage.removeItem('emviapp_user_role');
      window.localStorage.removeItem('emviapp_new_user');
      
      // Ensure we clean up any cached data
      toast.success('You have been signed out');
      
      // Force reload to clear any cached state
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  }, []);
  
  return signOut;
};
