
import { UserRole, LegacyUserRole } from "@/context/auth/types";
import { isRoleEquivalent } from "@/utils/roleUtils";

/**
 * Helper function to check if a user role is an artist or related
 */
export const isArtistRole = (userRole: UserRole | null): boolean => {
  return isRoleEquivalent(userRole, [
    'artist', 
    'nail technician/artist', 
    'renter'
  ]);
};

/**
 * Helper function to check if a user role is a salon owner
 */
export const isSalonOwnerRole = (userRole: UserRole | null): boolean => {
  return isRoleEquivalent(userRole, [
    'salon_owner', 
    'salon', 
    'owner'
  ]);
};

/**
 * Helper function to check if a user role is a supplier
 */
export const isSupplierRole = (userRole: UserRole | null): boolean => {
  return isRoleEquivalent(userRole, [
    'supplier', 
    'vendor', 
    'beauty supplier'
  ]);
};

/**
 * Helper to convert any role into a display friendly name
 */
export const getRoleDisplayName = (userRole: UserRole | null): string => {
  if (!userRole) return "User";
  
  if (isArtistRole(userRole)) return "Artist";
  if (isSalonOwnerRole(userRole)) return "Salon Owner";
  if (isSupplierRole(userRole)) return "Supplier";
  
  // Standard roles
  switch(userRole) {
    case 'customer': return "Customer";
    case 'freelancer': return "Freelancer";
    case 'other': return "User";
    default: return "User";
  }
};

/**
 * Helper to get role-based color/theme classes
 */
export const getRoleThemeClass = (userRole: UserRole | null): string => {
  if (isArtistRole(userRole)) return "text-purple-600";
  if (isSalonOwnerRole(userRole)) return "text-blue-600";
  if (isSupplierRole(userRole)) return "text-emerald-600";
  
  switch(userRole) {
    case 'customer': return "text-rose-600";
    case 'freelancer': return "text-amber-600";
    case 'other': return "text-gray-600";
    default: return "text-gray-600";
  }
};
