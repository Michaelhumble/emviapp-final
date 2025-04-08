
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { normalizeUserRole } from "@/utils/roleUtils";

export const useUserProfile = (
  user: User | null,
  setLoading: (loading: boolean) => void
) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Fetch user profile from database
  const fetchUserProfile = useCallback(async () => {
    if (!user) {
      setUserProfile(null);
      setUserRole(null);
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      if (!data) {
        console.log("No user profile found, creating one");
        // Create a new profile
        await createUserProfile(user);
        return;
      }

      // Normalize the role
      const normalizedRole = normalizeUserRole(data.role);
      console.log("[useUserProfile] Normalized role:", normalizedRole);
      
      // Map database fields to UserProfile
      const mappedProfile: UserProfile = {
        id: data.id,
        email: data.email || user.email || '',
        full_name: data.full_name || '',
        avatar_url: data.avatar_url,
        role: normalizedRole,
        created_at: data.created_at,
        updated_at: data.updated_at,
        
        // Map additional fields with proper fallbacks
        referral_count: data.referral_count || data.referral_code ? 0 : undefined,
        profile_views: data.profile_views || 0,
        
        // Extended properties
        salon_name: data.salon_name,
        company_name: data.company_name,
        bio: data.bio,
        specialty: data.specialty,
        location: data.location,
        instagram: data.instagram,
        website: data.website,
        phone: data.phone,
        custom_role: data.custom_role,
        contact_link: data.contact_link,
        skills: data.skills || [],
        skill_level: data.skill_level,
        portfolio_urls: data.portfolio_urls || [],
        preferences: data.preferences || [],
        boosted_until: data.boosted_until,
        credits: data.credits,
        affiliate_code: data.affiliate_code,
        referral_code: data.referral_code,
        accepts_bookings: data.accepts_bookings,
        booking_url: data.booking_url,
        preferred_language: data.preferred_language,
      };

      setUserProfile(mappedProfile);
      setUserRole(normalizedRole);
      
      return mappedProfile;
      
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, setLoading]);

  // Create a new user profile
  const createUserProfile = async (user: User) => {
    try {
      // Extract role from user metadata if available
      const userMetadata = user.user_metadata;
      const roleFromMetadata = userMetadata?.user_type;
      
      const normalizedRole = normalizeUserRole(roleFromMetadata || null);
      
      const newProfile = {
        id: user.id,
        email: user.email,
        full_name: userMetadata?.full_name || "",
        role: normalizedRole || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("users").insert(newProfile);

      if (error) {
        console.error("Error creating user profile:", error);
        return;
      }

      // Set the new profile
      setUserProfile(newProfile as UserProfile);
      setUserRole(normalizedRole);
      
    } catch (error) {
      console.error("Error in createUserProfile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user profile on demand
  const refreshUserProfile = useCallback(async () => {
    return fetchUserProfile();
  }, [fetchUserProfile]);

  // Fetch user profile on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
      setUserRole(null);
    }
  }, [user, fetchUserProfile]);

  return { userProfile, userRole, refreshUserProfile };
};
