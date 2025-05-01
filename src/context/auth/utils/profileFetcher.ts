
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
        console.log("Profile fetch timeout reached, using cached data");
        resolve(null);
      }, 5000); // 5-second timeout
    });
    
    // Race between fetch and timeout
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    
    // If timeout won, try to use cached data
    if (!result) {
      const cachedRole = localStorage.getItem('emviapp_user_role');
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
    
    if (!authError && authUser?.user_metadata?.role) {
      const rawRole = authUser.user_metadata.role as string;
      role = normalizeRole(rawRole as UserRole);
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
          role = normalizeRole(cachedRole as UserRole);
        }
      }
      
      return { profile: null, role };
    } else {
      console.log("User profile data retrieved successfully");
      
      // If we didn't get a role from metadata, use the database role
      if (!role && profile?.role) {
        const dbRole = profile.role as string;
        role = normalizeRole(dbRole as UserRole);
        localStorage.setItem('emviapp_user_role', role || '');
        
        // Sync role back to auth (don't wait for this)
        if (profile.role) {
          // Use background task pattern
          Promise.resolve().then(() => {
            supabase.auth.updateUser({
              data: { role: profile.role }
            }).catch(updateErr => {
              console.warn("Failed to update auth metadata with role:", updateErr);
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
    // Return minimal profile with cached role as fallback
    const cachedRole = localStorage.getItem('emviapp_user_role');
    return { 
      profile: null, 
      role: cachedRole ? normalizeRole(cachedRole as UserRole) : null 
    };
  }
};

// React Query key factory for profile data
export const profileKeys = {
  all: ['profile'] as const,
  user: (userId: string) => [...profileKeys.all, userId] as const,
  userData: (userId: string) => [...profileKeys.user(userId), 'data'] as const,
  userRole: (userId: string) => [...profileKeys.user(userId), 'role'] as const,
}
