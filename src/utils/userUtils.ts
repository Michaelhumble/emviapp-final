
/**
 * Get initials from a user's name
 * @param name - Full name of the user
 * @returns The first letter of the first name and the first letter of the last name
 */
export const getInitials = (name?: string): string => {
  if (!name) return "?";
  
  const names = name.trim().split(' ');
  
  // For a single name, return the first letter
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  // For multiple names, return first letter of first and last name
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
};

/**
 * Format a name for display 
 * @param name - Full name of the user
 * @returns Formatted name or fallback
 */
export const formatName = (name?: string, fallback = "User"): string => {
  if (!name) return fallback;
  
  // If name is very long, truncate it
  if (name.length > 20) {
    return `${name.substring(0, 20)}...`;
  }
  
  return name;
};

/**
 * Safely get a user property with fallback
 * @param user - User object  
 * @param property - Property to get
 * @param fallback - Fallback value
 */
export const getUserProperty = <T>(user: any | null, property: string, fallback: T): T => {
  if (!user) return fallback;
  return user[property] !== undefined ? user[property] : fallback;
};
