
/**
 * Generates initials from a name
 */
export const getInitials = (name: string = 'User'): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
