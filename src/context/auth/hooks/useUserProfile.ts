
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { getUserRole, normalizeUserRole } from "@/utils/roleUtils";

/**
 * Hook to handle user profile management with improved role handling
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [fetching, setFetching] = useState(false);

  // Function to fetch user profile with improved error handling and debugging
  const getUserProfile = useCallback(async (userId: string) => {
    if (fetching) return; // Prevent concurrent fetches
    
    try {
      console.log(`[Auth] Fetching profile for user: ${userId}`);
      setFetching(true);
      setLoading(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("[Auth] Error fetching profile:", error);
        throw error;
      }
      
      if (data) {
        console.log(`[Auth] Profile loaded:`, data);
        
        // Get normalized role using our utility function
        const role = await getUserRole(userId);
        
        // Create clean UserProfile object with all properties mapped for backward compatibility
        const cleanProfile: UserProfile = {
          id: data.id || userId,
          email: data.email || '',
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || '',
          role: role,
          created_at: data.created_at || new Date().toISOString(),
          updated_at: data.updated_at || new Date().toISOString(),
          
          // Map all extended properties for backward compatibility
          bio: data.bio || '',
          specialty: data.specialty || '',
          location: data.location || '',
          instagram: data.instagram || '',
          website: data.website || '',
          phone: data.phone || '',
          salon_name: data.salon_name || '',
          company_name: data.company_name || '',
          custom_role: data.custom_role || '',
          contact_link: data.contact_link || '',
          skills: data.skills || [],
          skill_level: data.skill_level || '',
          profile_views: data.profile_views || 0,
          referral_count: data.referral_count || 0,
          portfolio_urls: data.portfolio_urls || [],
          preferences: data.preferences || [],
          boosted_until: data.boosted_until || null,
          credits: data.credits || 0,
          affiliate_code: data.referral_code || '',
          referral_code: data.referral_code || '',
          accepts_bookings: data.accepts_bookings || false,
          booking_url: data.booking_url || '',
          preferred_language: data.preferred_language || 'en',
        };
        
        setUserProfile(cleanProfile);
        setUserRole(role);
        
        // Cache in localStorage for emergency fallback
        if (role) {
          localStorage.setItem('emviapp_user_role', role);
        }
      } else {
        console.warn(`[Auth] No profile found for user ${userId}`);
        setUserProfile(null);
        setUserRole(null);
        localStorage.removeItem('emviapp_user_role');
      }
    } catch (err) {
      console.error("[Auth] Error in getUserProfile:", err);
      setUserProfile(null);
      setUserRole(null);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  }, [setLoading, fetching]);

  // Refresh user profile - exposed function for manual refresh
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log(`[Auth] Manual profile refresh requested for: ${user.id}`);
      await getUserProfile(user.id);
    } else {
      console.warn('[Auth] Cannot refresh profile: No authenticated user');
    }
  }, [user, getUserProfile]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      console.log(`[Auth] User changed, fetching profile for: ${user.id}`);
      // Use setTimeout to avoid potential deadlocks with Supabase client
      setTimeout(() => {
        getUserProfile(user.id);
      }, 0);
    } else {
      // Clear user profile and role when logged out
      console.log(`[Auth] User logged out or no user, clearing profile data`);
      setUserProfile(null);
      setUserRole(null);
      localStorage.removeItem('emviapp_user_role');
    }
  }, [user, getUserProfile]);

  return {
    userProfile,
    userRole,
    refreshUserProfile
  };
};
