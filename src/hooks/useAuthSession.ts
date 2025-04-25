import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, UserRole } from '@/context/auth/types';

const profileAdapter = (rawProfileData: any): UserProfile => {
  if (!rawProfileData) return null;

  return {
    id: rawProfileData.id,
    full_name: rawProfileData.full_name || '',
    email: rawProfileData.email || '',
    phone: rawProfileData.phone || '',
    bio: rawProfileData.bio || '',
    specialty: rawProfileData.specialty || '',
    location: rawProfileData.location || '',
    avatar_url: rawProfileData.avatar_url || '',
    role: rawProfileData.role || 'customer',
    created_at: rawProfileData.created_at || '',
    updated_at: rawProfileData.updated_at || '',
    instagram: rawProfileData.instagram || '',
    website: rawProfileData.website || '',
    preferred_language: rawProfileData.preferred_language || 'en',
    referral_code: rawProfileData.referral_code || '',
    affiliate_code: rawProfileData.affiliate_code || '',
    booking_url: rawProfileData.booking_url || '',
    boosted_until: rawProfileData.boosted_until || null,
    portfolio_urls: Array.isArray(rawProfileData.portfolio_urls) ? rawProfileData.portfolio_urls : [],
    credits: typeof rawProfileData.credits === 'number' ? rawProfileData.credits : 0,
    contact_link: rawProfileData.contact_link || '',
    badges: rawProfileData.badges || [],
    accepts_bookings: Boolean(rawProfileData.accepts_bookings),
    preferences: Array.isArray(rawProfileData.preferences) ? rawProfileData.preferences : [],
    completed_profile_tasks: Array.isArray(rawProfileData.completed_profile_tasks) ? rawProfileData.completed_profile_tasks : [],
    profile_completion: typeof rawProfileData.profile_completion === 'number' ? rawProfileData.profile_completion : 0,
    
    // Handle additional properties used by components
    user_id: rawProfileData.id, // Use ID as user_id for compatibility
    favorite_artist_types: rawProfileData.favorite_artist_types || [],
    artistTypes: rawProfileData.favorite_artist_types || [],
    communication_preferences: rawProfileData.communication_preferences || [],
    commPrefs: rawProfileData.communication_preferences || [],
    birthday: rawProfileData.birthday || null,
    
    // Artist-specific fields
    skills: rawProfileData.skills || [],
    years_experience: rawProfileData.years_experience || 0,
    
    // Premium-related fields
    is_premium: Boolean(rawProfileData.is_premium),
    
    // Salon-specific fields
    salon_name: rawProfileData.salon_name || '',
    company_name: rawProfileData.company_name || '',
    
    // Others
    username: rawProfileData.username || '',
    custom_role: rawProfileData.custom_role || '',
    profile_views: rawProfileData.profile_views || 0,
    creditsThisMonth: rawProfileData.creditsThisMonth || 0,
  };
};

export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  isLoading: boolean;
  isSignedIn: boolean;
  isError: boolean;
  error: Error | null;
  isNewUser: boolean;
  session: Session | null;
  clearIsNewUser: () => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: Error }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ success: boolean; error?: Error; userId?: string }>;
  signOut: () => Promise<void>;
  refreshUserProfile: () => Promise<boolean>;
  updateUserRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: Error }>;
}

const normalizeRole = (role: string): UserRole => {
  const validRoles: UserRole[] = [
    'customer', 'artist', 'salon', 'freelancer', 'manager', 'admin', 
    'nail technician/artist', 'owner', 'vendor', 'supplier', 
    'beauty supplier', 'renter', 'other'
  ];
  
  const normalizedRole = role.toLowerCase().trim();
  
  if (validRoles.includes(normalizedRole as UserRole)) {
    return normalizedRole as UserRole;
  }
  
  return 'customer'; // Default role
};

export const useAuthSession = (): AuthState => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>('customer');
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
        
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event);
            
            setSession(session);
            setUser(session?.user || null);
            
            if (session?.user) {
              if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                await fetchUserProfile(session.user.id);
              }
            } else {
              setUserProfile(null);
              setUserRole('customer');
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Auth initialization error:', err);
        setIsError(true);
        setError(err instanceof Error ? err : new Error('Failed to initialize authentication'));
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const profile = profileAdapter(data);
        
        setUserProfile(profile);
        setUserRole(profile.role || 'customer');
      } else {
        setIsNewUser(true);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        const profile = profileAdapter(data);
        
        setUserProfile(profile);
        setUserRole(profile.role || 'customer');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error refreshing user profile:', err);
      return false;
    }
  };

  const updateUserRole = async (role: UserRole) => {
    if (!user?.id) return;
    
    try {
      await supabase.auth.updateUser({
        data: { role }
      });
      
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUserRole(role);
      await refreshUserProfile();
    } catch (err) {
      console.error('Error updating user role:', err);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: Error }> => {
    if (!user?.id) {
      return { success: false, error: new Error('User not authenticated') };
    }
    
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('Failed to update profile')
      };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      console.error('Sign in error:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('Failed to sign in') 
      };
    }
  };

  const signUp = async (email: string, password: string, userData?: any): Promise<{ success: boolean; error?: Error; userId?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            ...userData
          }
        }
      });
      
      if (error) throw error;
      
      setIsNewUser(true);
      
      return { 
        success: true,
        userId: data.user?.id
      };
    } catch (err) {
      console.error('Sign up error:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('Failed to sign up')
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserProfile(null);
      setUserRole('customer');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
  };

  return {
    user,
    userProfile,
    userRole,
    loading,
    isLoading: loading,
    isSignedIn: !!user,
    isError,
    error,
    isNewUser,
    session,
    clearIsNewUser,
    refreshUserProfile,
    updateUserRole,
    updateProfile,
    signIn,
    signUp,
    signOut
  };
};
