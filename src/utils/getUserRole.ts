
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { normalizeUserRole } from "./roleUtils";

/**
 * Gets the user role directly from Supabase with proper logging
 * First checks users table, then falls back to auth metadata
 */
export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  if (!userId) {
    console.error("[getUserRole] No userId provided");
    return null;
  }
  
  try {
    console.log(`[getUserRole] Fetching role for user: ${userId}`);
    
    // First try to get role from users table (primary source of truth)
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    
    if (userError) {
      console.error("[getUserRole] Error fetching user role from users table:", userError);
    }
    
    // If we found a role in the users table
    if (userData?.role) {
      const normalizedDbRole = normalizeUserRole(userData.role);
      console.log(`[getUserRole] Role from users table: ${userData.role} → normalized: ${normalizedDbRole}`);
      
      // Check auth metadata as secondary source
      const { data: authData, error: authError } = await supabase.auth.getUser();
      
      if (!authError && authData?.user?.user_metadata?.role) {
        const metadataRole = authData.user.user_metadata.role;
        const normalizedMetadataRole = normalizeUserRole(metadataRole);
        
        console.log(`[getUserRole] Role from auth metadata: ${metadataRole} → normalized: ${normalizedMetadataRole}`);
        
        // If roles don't match, update auth metadata
        if (normalizedDbRole !== normalizedMetadataRole) {
          console.warn(`[getUserRole] Role mismatch: DB=${normalizedDbRole}, Metadata=${normalizedMetadataRole}. Syncing to DB value.`);
          
          // Update auth metadata to match DB
          await supabase.auth.updateUser({
            data: { role: normalizedDbRole }
          });
        }
      }
      
      return normalizedDbRole;
    }
    
    // Fallback to auth metadata if users table has no role
    console.log("[getUserRole] No role in users table, checking auth metadata");
    const { data: authData, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error("[getUserRole] Error fetching user auth data:", authError);
      return null;
    }
    
    if (authData?.user?.user_metadata?.role) {
      const metadataRole = authData.user.user_metadata.role;
      const normalizedMetadataRole = normalizeUserRole(metadataRole);
      
      console.log(`[getUserRole] Using role from auth metadata: ${metadataRole} → normalized: ${normalizedMetadataRole}`);
      
      // Sync to users table
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: normalizedMetadataRole })
        .eq('id', userId);
        
      if (updateError) {
        console.error("[getUserRole] Failed to sync metadata role to users table:", updateError);
      } else {
        console.log("[getUserRole] Successfully synced role from metadata to users table");
      }
      
      return normalizedMetadataRole;
    }
    
    console.warn("[getUserRole] No role found in users table or auth metadata");
    return null;
  } catch (err) {
    console.error("[getUserRole] Unexpected error:", err);
    return null;
  }
};
