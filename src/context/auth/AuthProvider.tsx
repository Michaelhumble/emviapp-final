import { createContext, ReactNode, useContext } from 'react';
import { AuthContextType } from './types';
import { useAuthProvider } from './hooks/useAuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, UserProfile } from './types';
import { normalizeRole } from '@/utils/roles';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuthProvider();

  const clearIsNewUser = () => {
    authState.setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;
      return { success: true, userId: data.user?.id };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!authState.user) throw new Error('No authenticated user');
      
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', authState.user.id);
      
      if (error) throw error;
      
      await authState.refreshUserProfile();
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    try {
      if (!authState.user) throw new Error('No authenticated user');
      
      const normalizedRole = normalizeRole(role);
      const { error } = await supabase
        .from('users')
        .update({ role: normalizedRole })
        .eq('id', authState.user.id);
      
      if (error) throw error;
      
      await authState.refreshUserProfile();
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    clearIsNewUser,
    signIn,
    signOut,
    signUp,
    updateProfile,
    updateUserRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
