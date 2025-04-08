
import { UserRole, LegacyUserRole } from "@/context/auth/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Normalizes user roles to handle variations and aliases
 * This is the single source of truth for role normalization
 */
export const normalizeUserRole = (role: string | null): UserRole | null => {
  if (!role) return null;
  
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
      return 'salon_owner';
      
    case 'beauty supplier':
    case 'vendor':
    case 'supplier':
    case 'beauty vendor':
      return 'supplier';
      
    case 'client':
    case 'customer':
    case 'user':
      return 'customer';
      
    case 'freelancer':
      return 'freelancer';
      
    case 'other':
      return 'other';
      
    // Return null for unknown roles, no defaults
    default:
      console.warn(`[Role] Unknown role: ${role}, unable to normalize`);
      return null;
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
    
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error("[getUserRole] Error fetching user role:", error);
      return null;
    }
    
    if (!data || !data.role) {
      console.log("[getUserRole] No role found for user");
      return null;
    }
    
    // Normalize the role
    const rawRole = data.role as string;
    console.log(`[getUserRole] Raw role from database:`, rawRole);
    
    const normalizedRole = normalizeUserRole(rawRole);
    console.log(`[getUserRole] Normalized role:`, normalizedRole);
    
    return normalizedRole;
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
