
/**
 * Get initials from a user's full name
 */
export const getInitials = (name?: string): string => {
  if (!name) return 'NA';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

/**
 * Format a user role for display
 */
export const formatUserRole = (role?: string): string => {
  if (!role) return 'User';
  
  return role
    .split(/[/_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Check if the user profile is complete enough based on their role
 */
export const isProfileComplete = (profile: any, role?: string): boolean => {
  if (!profile) return false;
  
  // Basic fields every user should have
  const hasBasicInfo = !!(
    profile.full_name &&
    profile.email
  );
  
  // For customers, just basic info is enough
  if (!role || role === 'customer') {
    return hasBasicInfo;
  }
  
  // For artists, require more info
  if (role === 'artist' || role === 'nail technician/artist' || role === 'freelancer') {
    return !!(
      hasBasicInfo &&
      profile.avatar_url &&
      profile.bio &&
      profile.specialty &&
      profile.location
    );
  }
  
  // For salon owners
  if (role === 'salon' || role === 'owner') {
    return !!(
      hasBasicInfo &&
      profile.salon_name &&
      profile.location &&
      profile.phone
    );
  }
  
  // Default case
  return hasBasicInfo;
};
