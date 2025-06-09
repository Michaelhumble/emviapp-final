
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { cacheProfile } from "./profileCache";

/**
 * Fetch fresh profile data from Supabase with optimized parallel fetching
 */
export const fetchFreshProfileData = async (userId: string): Promise<{ 
  profile: UserProfile | null; 
  role: UserRole | null;
}> => {
  console.log("🚨 PROFILE FETCHER: Starting for user:", userId);
  
  try {
    // Use Promise.all for parallel requests - optimized with early timeout handling
    const fetchPromise = Promise.all([
      supabase.auth.getUser(),
      supabase.from('users').select('*').eq('id', userId).single()
    ]);
    
    // Add a timeout to prevent long-running requests
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => {
        console.log("🚨 PROFILE FETCHER: Timeout reached, using cached data");
        resolve(null);
      }, 5000); // 5-second timeout
    });
    
    // Race between fetch and timeout
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    
    // If timeout won, try to use cached data
    if (!result) {
      const cachedRole = localStorage.getItem('emviapp_user_role');
      console.log("🚨 PROFILE FETCHER: Using cached role:", cachedRole);
      return { 
        profile: null, 
        role: cachedRole ? normalizeRole(cachedRole as UserRole) : null 
      };
    }
    
    const [authResponse, profileResponse] = result;
    
    // Process auth user result
    const authUser = authResponse.data?.user;
    const authError = authResponse.error;
    let role: UserRole | null = null;
    
    console.log("🚨 PROFILE FETCHER: Auth user data:", {
      userId: authUser?.id,
      userMetadata: authUser?.user_metadata,
      appMetadata: authUser?.app_metadata,
      error: authError
    });
    
    if (!authError && authUser?.user_metadata?.role) {
      const rawRole = authUser.user_metadata.role as string;
      role = normalizeRole(rawRole as UserRole);
      console.log("🚨 PROFILE FETCHER: Role from auth metadata:", rawRole, "->", role);
      localStorage.setItem('emviapp_user_role', role || '');
    }
    
    // Process profile result
    const profileError = profileResponse.error;
    const profile = profileResponse.data as unknown as UserProfile;
    
    console.log("🚨 PROFILE FETCHER: Profile data:", {
      profileId: profile?.id,
      profileRole: profile?.role,
      error: profileError
    });
    
    if (profileError) {
      console.error("🚨 PROFILE FETCHER: Profile fetch error:", profileError);
      
      // Try fallback to cached role if available
      if (!role) {
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          role = normalizeRole(cachedRole as UserRole);
          console.log("🚨 PROFILE FETCHER: Using cached role fallback:", role);
        }
      }
      
      return { profile: null, role };
    } else {
      console.log("🚨 PROFILE FETCHER: Profile retrieved successfully");
      
      // If we didn't get a role from metadata, use the database role
      if (!role && profile?.role) {
        const dbRole = profile.role as string;
        role = normalizeRole(dbRole as UserRole);
        console.log("🚨 PROFILE FETCHER: Role from database:", dbRole, "->", role);
        localStorage.setItem('emviapp_user_role', role || '');
        
        // Sync role back to auth (don't wait for this)
        if (profile.role) {
          // Use background task pattern
          Promise.resolve().then(() => {
            console.log("🚨 PROFILE FETCHER: Syncing role to auth metadata:", profile.role);
            supabase.auth.updateUser({
              data: { role: profile.role }
            }).catch(updateErr => {
              console.warn("🚨 PROFILE FETCHER: Failed to update auth metadata with role:", updateErr);
            });
          });
        }
      }
      
      // Store in cache - use optimized caching
      cacheProfile(userId, profile, role);
      
      console.log("🚨 PROFILE FETCHER: Final result:", { 
        profileId: profile?.id, 
        role,
        roleType: typeof role
      });
      
      return { profile, role };
    }
  } catch (error) {
    console.error("🚨 PROFILE FETCHER: Error:", error);
    // Return minimal profile with cached role as fallback
    const cachedRole = localStorage.getItem('emviapp_user_role');
    console.log("🚨 PROFILE FETCHER: Using cached role after error:", cachedRole);
    return { 
      profile: null, 
      role: cachedRole ? normalizeRole(cachedRole as UserRole) : null 
    };
  }
};
