
/**
 * Gets the initials from a full name
 * @param fullName Full name to get initials from
 * @returns First and last initials as a string
 */
export const getInitials = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') return '?';
  
  const names = fullName.trim().split(' ');
  
  if (names.length === 0) return '?';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  // Get first and last name initials
  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);
  
  return (firstInitial + lastInitial).toUpperCase();
};
