
import { UserProfile, UserRole } from '@/context/auth/types';

/**
 * Calculate profile completion percentage
 */
export function calculateProfileCompletion(userProfile: UserProfile | null, userRole?: UserRole | null): number {
  if (!userProfile) return 0;
  
  // Define required fields based on user role
  const requiredFields: Record<string, string[]> = {
    'artist': ['full_name', 'email', 'specialty', 'bio', 'avatar_url', 'instagram', 'location'],
    'nail technician/artist': ['full_name', 'email', 'specialty', 'bio', 'avatar_url', 'instagram'],
    'salon': ['full_name', 'email', 'salon_name', 'location', 'bio'],
    'owner': ['full_name', 'email', 'salon_name', 'location'],
    'customer': ['full_name', 'email', 'location'],
    'other': ['full_name', 'email'],
  };

  // Get the required fields for the user's role
  const role = userRole || userProfile.role || 'customer';
  const fieldsToCheck = requiredFields[role] || requiredFields['customer'];
  
  // Count how many required fields are filled
  const filledFields = fieldsToCheck.filter(field => {
    const value = userProfile[field as keyof typeof userProfile];
    return value !== undefined && value !== null && value !== '';
  });
  
  // Calculate completion percentage
  const percentage = Math.floor((filledFields.length / fieldsToCheck.length) * 100);
  return percentage;
}
