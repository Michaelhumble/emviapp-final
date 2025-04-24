
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '@/context/auth/types';

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

// Helper function to normalize role string to UserRole type
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

  // Initialize auth state
  useEffect(() => {
    // Get current session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Get current session
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
        
        // Setup auth state listener
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
        // Process profile data and ensure role is properly typed
        // Normalize fields to support all required properties
        const profile: UserProfile = {
          ...data,
          id: data.id,
          email: data.email || '',
          full_name: data.full_name || '',
          role: data.role ? normalizeRole(data.role) : 'customer',
          avatar_url: data.avatar_url || '',
          
          // Map database fields that might have different names
          userId: data.user_id || data.id,
          user_id: data.user_id || data.id,
          
          // Customer-specific fields
          favorite_artist_types: data.favorite_artist_types || [],
          artistTypes: data.favorite_artist_types || data.artistTypes || [],
          communication_preferences: data.communication_preferences || [],
          commPrefs: data.communication_preferences || data.commPrefs || [],
          birthday: data.birthday || null,
          
          // Artist-specific fields
          skills: data.skills || [],
          years_experience: data.years_experience || 0,
          portfolio_urls: data.portfolio_urls || [],
          custom_role: data.custom_role || '',
          is_premium: !!data.is_premium,
          
          // Add other fields with safe defaults
          profile_views: typeof data.profile_views === 'number' ? data.profile_views : 0,
          creditsThisMonth: typeof data.credits_this_month === 'number' ? data.credits_this_month : 0,
          credits: typeof data.credits === 'number' ? data.credits : 0,
          referral_count: typeof data.referral_count === 'number' ? data.referral_count : 0,
        };
        
        setUserProfile(profile);
        setUserRole(profile.role || 'customer');
      } else {
        // User exists in auth but not in profile table
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
        // Process profile data with normalized role and fields
        const profile: UserProfile = {
          ...data,
          id: data.id,
          email: data.email || '',
          full_name: data.full_name || '',
          role: data.role ? normalizeRole(data.role) : 'customer',
          avatar_url: data.avatar_url || '',
          
          // Map database fields that might have different names
          userId: data.user_id || data.id,
          user_id: data.user_id || data.id,
          
          // Customer-specific fields
          favorite_artist_types: data.favorite_artist_types || [],
          artistTypes: data.favorite_artist_types || data.artistTypes || [],
          communication_preferences: data.communication_preferences || [],
          commPrefs: data.communication_preferences || data.commPrefs || [],
          birthday: data.birthday || null,
          
          // Artist-specific fields
          skills: data.skills || [],
          years_experience: data.years_experience || 0,
          portfolio_urls: data.portfolio_urls || [],
          custom_role: data.custom_role || '',
          is_premium: !!data.is_premium,
          
          // Add other fields with safe defaults
          profile_views: typeof data.profile_views === 'number' ? data.profile_views : 0,
          creditsThisMonth: typeof data.credits_this_month === 'number' ? data.credits_this_month : 0,
          credits: typeof data.credits === 'number' ? data.credits : 0,
          referral_count: typeof data.referral_count === 'number' ? data.referral_count : 0,
        };
        
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
