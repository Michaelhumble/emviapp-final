
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserProfile, UserRole } from "./types";
import { useAuthMethods } from "./hooks/useAuthMethods";
import { getUserProfileFromMetadata } from "./services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  const { signIn, signUp, signOut } = useAuthMethods(setLoading);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profile = getUserProfileFromMetadata(session.user);
          setUserProfile(profile);
          
          // Check if this is a new user
          if (event === 'SIGNED_IN' && localStorage.getItem('emviapp_new_user') === 'true') {
            setIsNewUser(true);
            localStorage.removeItem('emviapp_new_user');
          }
        } else {
          setUserProfile(null);
          setIsNewUser(false);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = getUserProfileFromMetadata(session.user);
        setUserProfile(profile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        console.error('Error refreshing user profile:', error);
        return false;
      }
      
      const profile = getUserProfileFromMetadata(data.user);
      setUserProfile(profile);
      setUser(data.user);
      
      return true;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: new Error('No user logged in') };
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: data
      });
      
      if (error) throw error;
      
      await refreshUserProfile();
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error as Error };
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user) return;
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { role }
      });
      
      if (error) throw error;
      
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  const contextValue: AuthContextType = {
    user,
    session,
    userProfile,
    userRole: userProfile?.role || null,
    loading,
    isSignedIn: !!user,
    isError: false,
    isNewUser,
    clearIsNewUser,
    setLoading,
    refreshUserProfile,
    signIn: async (email: string, password: string) => {
      const result = await signIn(email, password);
      return { success: !result.error, error: result.error };
    },
    signOut,
    signUp: async (email: string, password: string, userData?: any) => {
      const result = await signUp(email, password);
      return { success: !result.error, error: result.error, userId: result.data?.user?.id };
    },
    updateProfile,
    updateUserRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
