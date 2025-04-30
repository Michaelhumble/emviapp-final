
import { UserRole } from '../types/authTypes';
import { normalizeRole as normalizeRoleFromUtils } from '@/utils/roles';
import { toast } from 'sonner';

/**
 * Determines the user's role from multiple sources with fallbacks
 * @param userMetadata User metadata from auth
 * @param profileRole Role from user profile record
 * @param storedRole Role from local storage
 * @returns Normalized user role or null if no role found
 */
export const determineUserRole = (
  userMetadata?: { [key: string]: any } | null,
  profileRole?: UserRole | null,
  storedRole?: string | null
): UserRole | null => {
  // Try to get role from user metadata (highest priority)
  if (userMetadata && userMetadata.role) {
    return normalizeRoleFromUtils(userMetadata.role as UserRole);
  }
  
  // Try to get role from profile record (second priority)
  if (profileRole) {
    return normalizeRoleFromUtils(profileRole as UserRole);
  }
  
  // Try to get role from localStorage (lowest priority)
  if (storedRole) {
    return normalizeRoleFromUtils(storedRole as UserRole);
  }
  
  // No role found
  return null;
};

/**
 * Persist user role in local storage for fallback
 * @param role User role to persist
 */
export const persistUserRole = (role: UserRole | null): void => {
  if (role) {
    localStorage.setItem('emviapp_user_role', role);
  } else {
    localStorage.removeItem('emviapp_user_role');
  }
};

/**
 * Handle role updates with proper feedback
 * @param role New role to set
 * @param oldRole Previous role
 * @returns Boolean indicating if role changed
 */
export const handleRoleChange = (role: UserRole | null, oldRole: UserRole | null): boolean => {
  if (!role) return false;
  
  const normalizedRole = normalizeRoleFromUtils(role);
  
  // Only show notification if role actually changes
  if (normalizedRole !== oldRole) {
    persistUserRole(normalizedRole);
    toast.success(`Your role has been updated to: ${normalizedRole}`);
    return true;
  }
  
  return false;
};
