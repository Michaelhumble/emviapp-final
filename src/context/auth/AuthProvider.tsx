import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  userProfile: UserProfile | null;
  userRole: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setUserProfile(null);
        setUserRole(null);
        return;
      }

      try {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null);
          setUserRole(null);
          return;
        }
        
        const userRole = userData?.role || 'customer';
        setUserRole(userRole);
        
        let profileExtras = {};

      // Extract role-specific profile data
      if (userRole === 'owner' || userRole === 'salon') {
        profileExtras = {
          salon_name: userData?.salon_name || "",
          business_address: userData?.business_address || ""
        };
      } else if (userRole === 'supplier' || userRole === 'beauty supplier') {
        profileExtras = {
          company_name: userData?.company_name || "",
          product_type: userData?.product_type || ""
        };
      }

        const profile: UserProfile = {
          id: userData.id,
          email: userData.email,
          full_name: userData.full_name,
          avatar_url: userData.avatar_url,
          location: userData.location,
          bio: userData.bio,
          phone: userData.phone,
          instagram: userData.instagram,
          website: userData.website,
          specialty: userData.specialty,
          role: userData.role,
          skill_level: userData.skill_level,
          skills: userData.skills,
          ...profileExtras
        };
        
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
        setUserRole(null);
      }
    };

    fetchUserProfile();
  }, [user]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
      toast({
        description: "Signed out successfully!",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        description: "Failed to sign out",
      });
    }
  };
  
  const refreshUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error("Error refreshing user profile:", error);
        return;
      }
      
      const userRole = userData?.role || 'customer';
      setUserRole(userRole);
      
      let profileExtras = {};

      // Extract role-specific profile data
      if (userRole === 'owner' || userRole === 'salon') {
        profileExtras = {
          salon_name: userData?.salon_name || "",
          business_address: userData?.business_address || ""
        };
      } else if (userRole === 'supplier' || userRole === 'beauty supplier') {
        profileExtras = {
          company_name: userData?.company_name || "",
          product_type: userData?.product_type || ""
        };
      }

      const profile: UserProfile = {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        avatar_url: userData.avatar_url,
        location: userData.location,
        bio: userData.bio,
        phone: userData.phone,
        instagram: userData.instagram,
        website: userData.website,
        specialty: userData.specialty,
        role: userData.role,
        skill_level: userData.skill_level,
        skills: userData.skills,
        ...profileExtras
      };
      
      setUserProfile(profile);
    } catch (error) {
      console.error("Error refreshing user profile:", error);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    signOut,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
