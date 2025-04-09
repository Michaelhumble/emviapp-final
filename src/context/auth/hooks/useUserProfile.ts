
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
      return null;
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
        return null;
      }

      // First try to get role from database
      let finalRole: UserRole | null = null;
      
      if (data.role) {
        // Normalize the role from database
        finalRole = normalizeUserRole(data.role);
        console.log("[useUserProfile] Role from database:", data.role, "→ normalized:", finalRole);
      } 
      // If no role in database, check auth metadata
      else if (user.user_metadata?.role) {
        const metadataRole = normalizeUserRole(user.user_metadata.role);
        console.log("[useUserProfile] No role in database, using from metadata:", user.user_metadata.role, "→ normalized:", metadataRole);
        
        finalRole = metadataRole;
        
        // Sync metadata role back to database
        if (finalRole) {
          console.log("[useUserProfile] Syncing role from metadata to database:", finalRole);
          
          const { error: updateError } = await supabase
            .from("users")
            .update({ role: finalRole })
            .eq("id", user.id);
            
          if (updateError) {
            console.error("[useUserProfile] Error syncing role to database:", updateError);
          }
        }
      }
      
      // If we have database role but no metadata role, sync to metadata
      if (finalRole && (!user.user_metadata?.role || normalizeUserRole(user.user_metadata.role) !== finalRole)) {
        console.log("[useUserProfile] Syncing role from database to metadata:", finalRole);
        
        await supabase.auth.updateUser({
          data: { role: finalRole }
        });
      }
      
      // Map database fields to UserProfile with proper type safety
      const mappedProfile: UserProfile = {
        id: data.id,
        email: data.email || user.email || '',
        full_name: data.full_name || '',
        avatar_url: data.avatar_url,
        role: finalRole,
        created_at: data.created_at,
        updated_at: data.updated_at,
        
        // Handle potentially missing properties with safe fallbacks
        referral_count: typeof data.referral_count === 'number' ? data.referral_count : 0,
        profile_views: typeof data.profile_views === 'number' ? data.profile_views : 0,
        
        // Extended properties with fallbacks
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
        skills: Array.isArray(data.skills) ? data.skills : [],
        skill_level: data.skill_level || '',
        portfolio_urls: Array.isArray(data.portfolio_urls) ? data.portfolio_urls : [],
        preferences: Array.isArray(data.preferences) ? data.preferences : [],
        boosted_until: data.boosted_until || null,
        credits: typeof data.credits === 'number' ? data.credits : 0,
        affiliate_code: data.affiliate_code || '',
        referral_code: data.referral_code || '',
        accepts_bookings: !!data.accepts_bookings,
        booking_url: data.booking_url || '',
        preferred_language: data.preferred_language || '',
      };

      setUserProfile(mappedProfile);
      setUserRole(finalRole);
      
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
      const roleFromMetadata = userMetadata?.role;
      
      const normalizedRole = normalizeUserRole(roleFromMetadata || null);
      console.log("[createUserProfile] Creating profile with role:", normalizedRole);
      
      const newProfile = {
        id: user.id,
        email: user.email,
        full_name: userMetadata?.full_name || "",
        role: normalizedRole,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Add default values for required fields
        referral_code: `EMVI${Math.floor(1000 + Math.random() * 9000)}`,
        credits: 0
      };

      const { error } = await supabase.from("users").insert(newProfile);

      if (error) {
        console.error("Error creating user profile:", error);
        return;
      }

      console.log("[createUserProfile] New profile created with role:", normalizedRole);
      
      // Set the new profile
      setUserProfile(newProfile as UserProfile);
      setUserRole(normalizedRole);
      
      // Make sure auth metadata has the role
      if (normalizedRole && (!userMetadata?.role || normalizeUserRole(userMetadata.role) !== normalizedRole)) {
        console.log("[createUserProfile] Syncing new role to auth metadata:", normalizedRole);
        
        await supabase.auth.updateUser({
          data: { role: normalizedRole }
        });
      }
      
    } catch (error) {
      console.error("Error in createUserProfile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user profile on demand
  const refreshUserProfile = useCallback(async () => {
    return await fetchUserProfile();
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
