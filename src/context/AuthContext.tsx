
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = 
  | 'customer' 
  | 'artist' 
  | 'salon' 
  | 'vendor'
  | 'freelancer' 
  | 'other'
  | 'renter'  // legacy role
  | 'owner'   // legacy role
  | 'supplier'  // legacy role
  | 'nail technician/artist'  // legacy role
  | 'beauty supplier'  // legacy role
  | null;

type UserMetadata = {
  full_name?: string;
  user_type?: UserRole;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: UserRole;
  userProfile: any | null;
  profileComplete: boolean;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (data) {
        setUserRole(data.role as UserRole);
        setUserProfile(data);
        
        // Check if profile is complete based on role-specific required fields
        let isComplete = false;
        
        if (data.role === 'artist' || data.role === 'freelancer') {
          isComplete = !!(data.full_name && data.bio && data.specialty);
        } else if (data.role === 'salon' || data.role === 'owner') {
          isComplete = !!(data.salon_name && data.business_address);
        } else if (data.role === 'vendor' || data.role === 'supplier' || data.role === 'beauty supplier') {
          isComplete = !!(data.company_name && data.product_type);
        } else {
          // For customers and other roles, simpler requirements
          isComplete = !!(data.full_name);
        }
        
        setProfileComplete(isComplete);
        console.log("User profile fetched:", data, "Profile complete:", isComplete);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const refreshUserProfile = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in');
          if (session?.user) {
            fetchUserProfile(session.user.id);
          }
        } else if (event === 'SIGNED_OUT') {
          toast.info('Signed out');
          setUserRole(null);
          setUserProfile(null);
          setProfileComplete(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: UserMetadata): Promise<void> => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Signup successful! Please check your email for verification.');
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  const updateUserRole = async (role: UserRole): Promise<void> => {
    if (!user) {
      toast.error('You must be signed in to update your role');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);
      
      if (error) {
        toast.error('Failed to update role');
        throw error;
      }
      
      setUserRole(role);
      toast.success(`Role updated to ${role}`);
    } catch (error: any) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userRole,
      userProfile,
      profileComplete,
      signUp, 
      signIn, 
      signOut,
      updateUserRole,
      refreshUserProfile
    }}>
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
