
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { cacheProfile } from "./profileCache";

/**
 * REFACTOR: Simplified to use ONLY auth metadata as source of truth for roles
 * Removed all localStorage fallbacks and interactions
 */
export const fetchFreshProfileData = async (userId: string): Promise<{ 
  profile: UserProfile | null; 
  role: UserRole | null;
}> => {
  console.log("Fetching fresh profile data for:", userId);
  
  try {
    // Use Promise.all for parallel requests - optimized with early timeout handling
    const fetchPromise = Promise.all([
      supabase.auth.getUser(),
      supabase.from('users').select('*').eq('id', userId).single()
    ]);
    
    // Add a timeout to prevent long-running requests
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => {
        console.log("Profile fetch timeout reached");
        resolve(null);
      }, 5000); // 5-second timeout
    });
    
    // Race between fetch and timeout
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    
    // If timeout won, return null (no localStorage fallback)
    if (!result) {
      console.log("REFACTOR: Timeout reached, no localStorage fallback - auth metadata is single source");
      return { profile: null, role: null };
    }
    
    const [authResponse, profileResponse] = result;
    
    // Process auth user result - SINGLE SOURCE OF TRUTH
    const authUser = authResponse.data?.user;
    const authError = authResponse.error;
    let role: UserRole | null = null;
    
    if (!authError && authUser?.user_metadata?.role) {
      const rawRole = authUser.user_metadata.role as string;
      role = normalizeRole(rawRole as UserRole);
      console.log("REFACTOR: Role from auth metadata (single source):", role);
    }
    
    // Process profile result
    const profileError = profileResponse.error;
    const profile = profileResponse.data as unknown as UserProfile;
    
    if (profileError) {
      console.error("User profile fetch error:", profileError);
      // REFACTOR: No localStorage fallback - return what we have from auth metadata
      return { profile: null, role };
    } else {
      console.log("User profile data retrieved successfully");
      
      // If we didn't get a role from metadata, use the database role
      if (!role && profile?.role) {
        const dbRole = profile.role as string;
        role = normalizeRole(dbRole as UserRole);
        
        // Sync role to auth metadata for consistency (don't wait for this)
        if (profile.role) {
          Promise.resolve().then(() => {
            supabase.auth.updateUser({
              data: { role: profile.role }
            }).catch(updateErr => {
              console.warn("Failed to sync role to auth metadata:", updateErr);
            });
          });
        }
      }
      
      // Store in cache - use optimized caching
      cacheProfile(userId, profile, role);
      
      return { profile, role };
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // REFACTOR: No localStorage fallback - return null for clean error state
    return { profile: null, role: null };
  }
};
