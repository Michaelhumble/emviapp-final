
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { cacheProfile } from "./profileCache";

/**
 * Fetch fresh profile data from Supabase
 */
export const fetchFreshProfileData = async (userId: string): Promise<{ 
  profile: UserProfile | null; 
  role: UserRole | null;
}> => {
  console.log("Fetching fresh profile data for:", userId);
  
  try {
    // Use Promise.all for parallel requests
    const [authResponse, profileResponse] = await Promise.all([
      supabase.auth.getUser(),
      supabase.from('users').select('*').eq('id', userId).single()
    ]);
    
    // Process auth user result
    const authUser = authResponse.data?.user;
    const authError = authResponse.error;
    let role: UserRole | null = null;
    
    if (!authError && authUser?.user_metadata?.role) {
      role = normalizeRole(authUser.user_metadata.role as string) as UserRole;
      localStorage.setItem('emviapp_user_role', role || '');
    }
    
    // Process profile result
    const profileError = profileResponse.error;
    const profile = profileResponse.data as unknown as UserProfile;
    
    if (profileError) {
      console.error("User profile fetch error:", profileError);
      
      // Try fallback to cached role if available
      if (!role) {
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          role = normalizeRole(cachedRole as string) as UserRole;
        }
      }
      
      return { profile: null, role };
    } else {
      console.log("User profile data retrieved successfully");
      
      // If we didn't get a role from metadata, use the database role
      if (!role && profile?.role) {
        role = normalizeRole(profile.role as string) as UserRole;
        localStorage.setItem('emviapp_user_role', role || '');
        
        // Sync role back to auth (don't wait for this)
        if (profile.role) {
          supabase.auth.updateUser({
            data: { role: profile.role }
          }).catch(updateErr => {
            console.warn("Failed to update auth metadata with role:", updateErr);
          });
        }
      }
      
      // Store in cache
      cacheProfile(userId, profile, role);
      
      return { profile, role };
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return { profile: null, role: null };
  }
};
