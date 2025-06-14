
import { UserRole } from "@/context/auth/types";

/**
 * Normalize different role naming conventions to a standard UserRole type
 */
export const normalizeRole = (role: UserRole | string | null | undefined): UserRole | null => {
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
      return 'nail technician/artist'; // Keep exact wording as specified
      
    case 'salon':
      return 'salon';
      
    case 'owner':
    case 'salon owner':
    case 'business owner':
      return 'owner';
      
    case 'freelancer':
    case 'independent':
    case 'independent artist':
      return 'freelancer';
      
    case 'supplier':
    case 'beauty supplier':
      return 'beauty supplier';
    
    case 'vendor':
      return 'vendor';
      
    case 'renter':
    case 'booth renter':
    case 'chair renter':
      return 'renter';

    case 'manager':
      return 'manager';

    case 'admin':
    case 'administrator':
      return 'admin';
      
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
        return role as UserRole;
      }
      
      // Default to null for unrecognized roles
      return null;
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
    case 'vendor':
      return 'Vendor';
    case 'beauty supplier':
      return 'Beauty Supplier';
    case 'nail technician/artist':
      return 'Nail Technician/Artist';
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
