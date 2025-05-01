
import { UserRole } from "@/context/auth/types";

/**
 * Normalize different role naming conventions to a standard UserRole type
 */
export const normalizeRole = (role: UserRole | string | null): UserRole => {
  if (!role) return null;
  
  // Convert to lowercase for case-insensitive comparison
  const lowercaseRole = typeof role === 'string' ? role.toLowerCase().trim() : '';
  
  // Match to known roles with proper casing
  switch (lowercaseRole) {
    case 'customer':
    case 'client':
    case 'user':
      return 'customer';
      
    case 'artist':
    case 'nail artist':
    case 'nail tech':
    case 'nail technician':
    case 'nail technician/artist':
      return 'artist';
      
    case 'salon':
    case 'salon owner':
      return 'salon';
      
    case 'owner':
    case 'business owner':
      return 'owner';
      
    case 'freelancer':
    case 'independent':
    case 'independent artist':
      return 'freelancer';
      
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return 'supplier';
    
    case 'manager':
      return 'manager';
      
    default:
      // If it's already a valid UserRole, return it
      if (role === 'customer' || 
          role === 'artist' || 
          role === 'salon' || 
          role === 'owner' || 
          role === 'freelancer' ||
          role === 'supplier' || 
          role === 'manager' ||
          role === 'other') {
        return role as UserRole;
      }
      
      // Default to "other" for unrecognized roles
      return 'other';
  }
};

/**
 * Get a descriptive label for a user role
 */
export const getRoleLabel = (role: UserRole | null): string => {
  if (!role) return 'User';
  
  switch (role) {
    case 'customer':
      return 'Customer';
    case 'artist':
      return 'Nail Artist';
    case 'salon':
      return 'Salon';
    case 'owner':
      return 'Salon Owner';
    case 'freelancer':
      return 'Freelancer';
    case 'supplier':
      return 'Supplier';
    case 'manager':
      return 'Manager';
    case 'other':
      return 'Other';
    default:
      return 'User';
  }
};
