
/**
 * Utility functions for user-related operations
 */

/**
 * Get initials from a name string
 * @param name Full name to extract initials from
 * @returns The first letter of each word in the name, uppercased
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
