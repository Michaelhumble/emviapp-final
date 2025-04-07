
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";

/**
 * Hook to handle user profile management
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      setLoading(true);
      
      // Get user profile from the database using maybeSingle to prevent errors
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
        return;
      }
      
      if (!data) {
        console.log('No user profile found');
        setLoading(false);
        return;
      }
      
      console.log("User profile retrieved:", data);
      
      // Cast role to UserRole and create user profile
      const fetchedRole = data.role ? (data.role as UserRole) : null;
      setUserRole(fetchedRole);
      
      // Create a profile object, safely checking if each property exists
      const profile: UserProfile = {
        id: data.id || userId,
        email: data.email || '',
        full_name: data.full_name || '',
        avatar_url: data.avatar_url || '',
        location: data.location || '',
        bio: data.bio || '',
        phone: data.phone || '',
        instagram: data.instagram || '',
        website: data.website || '',
        specialty: data.specialty || '',
        role: fetchedRole || 'customer',
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
        preferred_language: data.preferred_language || '',
        // Safely handle optional properties
        referral_count: 0, // Default value if not in database
        salon_name: '', // Default value if not in database
        company_name: '', // Default value if not in database
        custom_role: data.custom_role || '',
        contact_link: data.contact_link || '',
        skills: [], // Default value if not in database
        skill_level: '', // Default value if not in database
        profile_views: 0, // Default value if not in database
        preferences: Array.isArray(data.preferences) ? data.preferences : [],
        affiliate_code: data.referral_code || '',
        referral_code: data.referral_code || '',
        credits: data.credits || 0,
        boosted_until: data.boosted_until || null
      };
      
      setUserProfile(profile);
      
    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user profile
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  }, [user]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      // Use setTimeout to avoid potential deadlocks with Supabase client
      setTimeout(() => {
        fetchUserProfile(user.id);
      }, 0);
    } else {
      // Clear user profile and role when logged out
      setUserProfile(null);
      setUserRole(null);
    }
  }, [user]);

  return {
    userProfile,
    userRole,
    refreshUserProfile
  };
};
