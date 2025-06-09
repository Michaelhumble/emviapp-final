import { UserRole } from "@/context/auth/types";

/**
 * Normalize different role naming conventions to a standard UserRole type
 */
export const normalizeRole = (role: UserRole | string | null | undefined): UserRole | null => {
  console.log('🚨 NORMALIZE ROLE INPUT:', role, typeof role);
  
  if (!role) {
    console.log('🚨 NORMALIZE ROLE: Empty input, returning null');
    return null;
  }
  
  // Convert to lowercase for case-insensitive comparison
  const lowercaseRole = typeof role === 'string' ? role.toLowerCase().trim() : '';
  console.log('🚨 NORMALIZE ROLE: Lowercase role:', lowercaseRole);
  
  let normalizedRole: UserRole | null = null;
  
  // Match to known roles with proper casing
  switch (lowercaseRole) {
    case 'customer':
    case 'client':
    case 'user':
      normalizedRole = 'customer';
      break;
      
    case 'artist':
    case 'nail artist':
    case 'nail tech':
    case 'nail technician':
    case 'nail technician/artist':
      normalizedRole = 'artist';
      break;
      
    case 'salon':
      normalizedRole = 'salon';
      break;
      
    case 'owner':
    case 'salon owner':
    case 'business owner':
      normalizedRole = 'owner';
      break;
      
    case 'freelancer':
    case 'independent':
    case 'independent artist':
      normalizedRole = 'freelancer';
      break;
      
    case 'supplier':
    case 'beauty supplier':
      normalizedRole = 'supplier';
      break;
    
    case 'vendor':
      normalizedRole = 'vendor';
      break;
      
    case 'renter':
    case 'booth renter':
    case 'chair renter':
      normalizedRole = 'renter';
      break;

    case 'manager':
      normalizedRole = 'manager';
      break;

    case 'admin':
    case 'administrator':
      normalizedRole = 'admin';
      break;
      
    default:
      // If it's already a valid UserRole, return it
      if (role === 'customer' || 
          role === 'artist' || 
          role === 'salon' || 
          role === 'owner' || 
          role === 'freelancer' ||
          role === 'manager' ||
          role === 'admin' ||
          role === 'supplier' || 
          role === 'vendor' || 
          role === 'beauty supplier' || 
          role === 'nail technician/artist' || 
          role === 'renter' ||
          role === 'other') {
        normalizedRole = role as UserRole;
      } else {
        // Default to null for unrecognized roles
        normalizedRole = null;
      }
  }
  
  console.log('🚨 NORMALIZE ROLE OUTPUT:', normalizedRole);
  return normalizedRole;
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
    case 'vendor':
      return 'Vendor';
    case 'beauty supplier':
      return 'Beauty Supplier';
    case 'nail technician/artist':
      return 'Nail Technician';
    case 'renter':
      return 'Booth Renter';
    case 'manager':
      return 'Manager';
    case 'admin':
      return 'Administrator';
    case 'other':
      return 'Other';
    default:
      return 'User';
  }
};

/**
 * Check if a role is valid
 */
export const isValidRole = (role: any): role is UserRole => {
  const validRoles: UserRole[] = [
    'customer', 'artist', 'salon', 'owner', 'manager', 'admin', 
    'freelancer', 'nail technician/artist', 'beauty supplier', 
    'supplier', 'vendor', 'renter', 'other'
  ];
  return validRoles.includes(role);
};
