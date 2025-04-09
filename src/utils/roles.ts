
import { UserRole } from "@/context/auth/types";

/**
 * Normalizes user roles to handle variations and aliases
 * IMPORTANT: This is the single source of truth for role normalization
 */
export const normalizeRole = (role: UserRole | null): UserRole | null => {
  if (!role) return null;
  
  // Convert role to lowercase for case-insensitive comparison
  const normalizedRole = role.toLowerCase() as UserRole;
  
  // Map role variations to standard roles
  switch (normalizedRole) {
    case 'nail technician/artist':
      return 'artist';
    case 'owner':
      return 'salon';
    case 'beauty supplier':
    case 'vendor':
      return 'supplier';
    case 'renter':
      return 'artist'; // Renters see artist dashboard
    default:
      return normalizedRole as UserRole;
  }
};
