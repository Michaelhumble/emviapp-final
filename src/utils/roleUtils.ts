import { UserRole, LegacyUserRole } from "@/context/auth/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Normalizes user roles to handle variations and aliases
 * This is the single source of truth for role normalization
 */
export const normalizeUserRole = (role: string | null): UserRole | null => {
  if (!role) {
    console.warn("[Role] Null or undefined role received in normalizeUserRole");
    return null;
  }
  
  // Convert role to lowercase for case-insensitive comparison
  const normalizedRole = role.toLowerCase().trim();
  
  // Log the normalization process for debugging
  console.log(`[Role] Normalizing role: ${role} → ${normalizedRole}`);
  
  // Map role variations to standard roles
  switch (normalizedRole) {
    case 'nail technician/artist':
    case 'nail technician':
    case 'nail artist':
    case 'technician':
    case 'nail tech':
    case 'artist':
    case 'renter':
    case 'booth renter':
      return 'artist';
      
    case 'owner':
    case 'salon owner':
    case 'salon business':
    case 'business owner':
    case 'salon':
    case 'salon_owner': // Explicitly handle this format
      return 'salon_owner';
      
    case 'beauty supplier':
    case 'vendor':
    case 'supplier':
    case 'beauty vendor':
    case 'supply_partner': // Legacy format
      return 'supplier';
      
    case 'client':
    case 'customer':
    case 'user':
      return 'customer';
      
    case 'freelancer':
      return 'freelancer';
      
    case 'other':
      return 'other';
      
    // If the role is already one of our valid values, just return it
    // This ensures we don't lose information by over-normalizing
    case 'customer':
    case 'artist':
    case 'salon_owner':
    case 'supplier':
    case 'freelancer':
      return normalizedRole as UserRole;
      
    // Log a warning for unknown roles, but return something to avoid errors
    default:
      console.warn(`[Role] Unknown role: ${role}, using 'other' as fallback`);
      return 'other';
  }
};

/**
 * Helper function for components to check role equivalence despite normalization
 * This allows components to continue using legacy role checks
 */
export const isRoleEquivalent = (userRole: UserRole | null, legacyRoles: LegacyUserRole[]): boolean => {
  if (!userRole) return false;
  
  // Direct comparison first (for exact matches)
  if (legacyRoles.includes(userRole)) return true;
  
  // For each legacy role, normalize it and check if it matches the user's normalized role
  return legacyRoles.some(legacyRole => {
    const normalizedLegacyRole = normalizeUserRole(legacyRole);
    return normalizedLegacyRole === normalizeUserRole(userRole);
  });
};

/**
 * Retrieves user role directly from Supabase
 * @param userId The user ID to get role for
 * @returns Promise containing the normalized UserRole or null
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

/**
 * Check if a user is allowed to view a specific route based on their role
 */
export const hasRoleAccess = (
  userRole: UserRole | null,
  allowedRoles: UserRole[]
): boolean => {
  if (!userRole) return false;
  
  // Log the access check for debugging
  console.log(`[Role Access] Checking if ${userRole} has access to route requiring: ${allowedRoles.join(', ')}`);
  
  // Check if normalized role is in allowed roles
  const hasAccess = allowedRoles.includes(userRole) || 
    allowedRoles.some(role => isRoleEquivalent(userRole, [role]));
    
  console.log(`[Role Access] Access granted: ${hasAccess}`);
  
  return hasAccess;
};

// Export these types properly using 'export type'
export type { UserRole, LegacyUserRole };
