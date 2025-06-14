
import { UserProfile, UserRole } from "@/context/auth/types";

export function normalizeRole(role: string | UserRole | null | undefined): UserRole | null {
  if (!role) return null;
  
  // If it's already a UserRole, return it
  if (typeof role === 'object') return role as UserRole;
  
  // Normalize string to UserRole
  const normalizedRole = role.toLowerCase().trim();
  
  switch (normalizedRole) {
    case 'customer':
      return 'customer';
    case 'artist':
      return 'artist';
    case 'salon':
      return 'salon';
    case 'owner':
      return 'owner';
    case 'manager':
      return 'manager';
    case 'admin':
      return 'admin';
    case 'freelancer':
      return 'freelancer';
    case 'nail technician/artist':
      return 'nail technician/artist';
    case 'beauty supplier':
      return 'beauty supplier';
    case 'supplier':
      return 'supplier';
    case 'vendor':
      return 'vendor';
    case 'renter':
      return 'renter';
    case 'other':
      return 'other';
    default:
      return 'customer'; // Default fallback
  }
}

export function normalizeBadges(badges: any): string[] {
  if (!badges) return [];
  if (Array.isArray(badges)) {
    return badges.map(badge => typeof badge === 'string' ? badge : String(badge));
  }
  return [];
}

export function normalizeUserProfile(dbProfile: any): UserProfile {
  if (!dbProfile) return null;
  
  return {
    ...dbProfile,
    role: normalizeRole(dbProfile.role),
    badges: normalizeBadges(dbProfile.badges),
  } as UserProfile;
}
