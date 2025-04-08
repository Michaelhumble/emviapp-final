
/**
 * Extracts and returns initials from a full name
 */
export const getInitials = (fullName?: string): string => {
  if (!fullName) return "?";
  
  return fullName
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
};
