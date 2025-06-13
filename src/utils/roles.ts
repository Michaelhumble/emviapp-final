
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
      
    case 'nail-artist':
    case 'nail artist':
    case 'nail tech':
    case 'nail technician':
    case 'nail technician/artist':
      return 'nail-artist';

    case 'hair-stylist':
    case 'hair stylist':
    case 'hairstylist':
    case 'hair specialist':
      return 'hair-stylist';

    case 'lash-tech':
    case 'lash tech':
    case 'lash technician':
    case 'lash specialist':
      return 'lash-tech';

    case 'barber':
    case 'barber specialist':
      return 'barber';

    case 'esthetician':
    case 'aesthetician':
    case 'skincare specialist':
      return 'esthetician';

    case 'massage-therapist':
    case 'massage therapist':
    case 'masseuse':
    case 'masseur':
      return 'massage-therapist';

    case 'salon-owner':
    case 'salon owner':
    case 'business owner':
    case 'owner':
      return 'salon-owner';

    case 'freelancer':
    case 'independent':
    case 'independent artist':
    case 'mobile artist':
      return 'freelancer';

    // Legacy role mappings
    case 'artist':
      return 'nail-artist'; // Default artist to nail-artist for backward compatibility
      
    case 'salon':
      return 'salon-owner';
      
    case 'supplier':
    case 'beauty supplier':
      return 'beauty-supplier';
    
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
          role === 'nail-artist' || 
          role === 'hair-stylist' || 
          role === 'lash-tech' || 
          role === 'barber' || 
          role === 'esthetician' || 
          role === 'massage-therapist' || 
          role === 'salon-owner' || 
          role === 'freelancer' ||
          role === 'artist' || 
          role === 'salon' || 
          role === 'owner' || 
          role === 'freelancer' ||
          role === 'manager' ||
          role === 'admin' ||
          role === 'beauty-supplier' || 
          role === 'supplier' || 
          role === 'vendor' || 
          role === 'renter' ||
          role === 'other') {
        return role as UserRole;
      }
      
      // Default to customer for unrecognized roles
      return 'customer';
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
    case 'nail-artist':
      return 'Nail Artist';
    case 'hair-stylist':
      return 'Hair Stylist';
    case 'lash-tech':
      return 'Lash Technician';
    case 'barber':
      return 'Barber';
    case 'esthetician':
      return 'Esthetician';
    case 'massage-therapist':
      return 'Massage Therapist';
    case 'salon-owner':
      return 'Salon Owner';
    case 'freelancer':
      return 'Freelancer';
    case 'artist':
      return 'Artist';
    case 'salon':
      return 'Salon';
    case 'owner':
      return 'Owner';
    case 'supplier':
    case 'beauty-supplier':
      return 'Beauty Supplier';
    case 'vendor':
      return 'Vendor';
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
    'customer', 'nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 
    'massage-therapist', 'salon-owner', 'freelancer', 'artist', 'salon', 'owner', 
    'manager', 'admin', 'beauty-supplier', 'supplier', 'vendor', 'renter', 'other'
  ];
  return validRoles.includes(role);
};

/**
 * Get dashboard route for a specific role
 */
export const getDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case 'nail-artist':
    case 'hair-stylist':
    case 'lash-tech':
    case 'barber':
    case 'esthetician':
    case 'massage-therapist':
    case 'artist':
      return '/dashboard/artist';
    case 'salon-owner':
    case 'salon':
    case 'owner':
      return '/dashboard/salon';
    case 'freelancer':
      return '/dashboard/freelancer';
    case 'customer':
      return '/dashboard/customer';
    case 'manager':
      return '/dashboard/manager';
    case 'admin':
      return '/dashboard/admin';
    case 'beauty-supplier':
    case 'supplier':
      return '/dashboard/supplier';
    default:
      return '/dashboard/customer';
  }
};
