
import { UserProfile } from '@/context/auth/types';

/**
 * Calculate the completion percentage of a user profile based on their role
 */
export const calculateProfileCompletion = (
  userProfile: UserProfile,
  userRole: string = 'customer'
): number => {
  // Fields required based on user role
  const requiredFields: Record<string, string[]> = {
    'artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
    'nail technician/artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
    'salon': ['full_name', 'email', 'salon_name', 'location', 'bio', 'phone'],
    'owner': ['full_name', 'email', 'salon_name', 'location', 'phone'],
    'customer': ['full_name', 'email', 'location', 'avatar_url'],
    'other': ['full_name', 'email']
  };
  
  // Get the appropriate field list based on user role
  const fieldsToCheck = requiredFields[userRole.toLowerCase()] || requiredFields['customer'];
  
  if (!userProfile) return 0;
  
  // Count completed fields
  let completedCount = 0;
  let totalFields = fieldsToCheck.length;
  
  fieldsToCheck.forEach(field => {
    if (field === 'portfolio_urls') {
      const urls = userProfile.portfolio_urls;
      if (urls && Array.isArray(urls) && urls.length > 0) {
        completedCount++;
      }
    } else if (field === 'completed_profile_tasks') {
      const tasks = userProfile.completed_profile_tasks;
      if (tasks && Array.isArray(tasks) && tasks.length > 0) {
        completedCount++;
      }
    } else {
      const value = userProfile[field as keyof typeof userProfile];
      if (value !== undefined && value !== null && value !== '') {
        completedCount++;
      }
    }
  });
  
  // Calculate percentage
  return Math.round((completedCount / totalFields) * 100);
};

/**
 * Check if a user has completed their profile
 */
export const hasCompletedProfile = (
  userProfile: UserProfile | null, 
  userRole: string = 'customer',
  minimumPercentage: number = 80
): boolean => {
  if (!userProfile) return false;
  
  const completionPercentage = calculateProfileCompletion(userProfile, userRole);
  return completionPercentage >= minimumPercentage;
};
