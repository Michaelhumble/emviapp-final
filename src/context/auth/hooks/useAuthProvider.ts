import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole, AuthContextType } from "../types";
import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { toast } from "sonner";

/**
 * Custom hook to handle auth provider logic
 */
export const useAuthProvider = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        console.log("Auth state changed:", event);
        
        // Update session and user
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle sign up event
        if (event === 'SIGNED_UP') {
          console.log("New user signed up!");
          setIsNewUser(true);
          localStorage.setItem('emviapp_new_user', 'true');
        }
        
        // Fetch user profile on auth state change
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          // Clear user profile and role when logged out
          setUserProfile(null);
          setUserRole(null);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Check if user is new from localStorage
        const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
        if (isNewUserFromStorage) {
          setIsNewUser(true);
        }
        
        // Fetch user profile if logged in
        if (initialSession?.user) {
          await fetchUserProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error("Error fetching initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      
      // Get user profile from the database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (!data) {
        console.log('No user profile found, creating one...');
        return;
      }
      
      console.log("User profile retrieved:", data);
      
      // Cast role to UserRole and create user profile
      const fetchedRole = data.role as UserRole || 'customer';
      setUserRole(fetchedRole);
      
      // Create a profile object, safely checking if each property exists
      const profile: UserProfile = {
        id: data.id,
        email: data.email || '',
        full_name: data.full_name || '',
        avatar_url: data.avatar_url || '',
        location: data.location || '',
        bio: data.bio || '',
        phone: data.phone || '',
        instagram: data.instagram || '',
        website: data.website || '',
        specialty: data.specialty || '',
        role: fetchedRole,
        created_at: data.created_at,
        updated_at: data.updated_at,
        preferred_language: data.preferred_language || '',
        // Safely handle optional properties that might not be in database yet
        referral_count: data.referral_count || 0,
        salon_name: data.salon_name || '',
        company_name: data.company_name || '',
        custom_role: data.custom_role || '',
        contact_link: data.contact_link || '',
        skills: Array.isArray(data.skills) ? data.skills : [],
        skill_level: data.skill_level || '',
        profile_views: data.profile_views || 0,
        preferences: Array.isArray(data.preferences) ? data.preferences : [],
        affiliate_code: data.referral_code || '',
        referral_code: data.referral_code || '',
        credits: data.credits || 0,
        boosted_until: data.boosted_until || null
      };
      
      setUserProfile(profile);
      
    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
    }
  };

  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Signed in successfully!");
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      setIsNewUser(true);
      localStorage.setItem('emviapp_new_user', 'true');
      
      toast.success("Account created successfully!");
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear user data
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
      
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error in signOut:", error);
      toast.error("Failed to sign out");
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  // Compile context value
  const authContextValue: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
  };

  return authContextValue;
};
