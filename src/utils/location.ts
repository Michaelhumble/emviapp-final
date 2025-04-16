
/**
 * Formats location information into a displayable string
 * @param location The location object or string
 * @returns Formatted location string
 */
export const getLocationString = (location?: string | null | { city?: string; state?: string; country?: string }) => {
  if (!location) return '';
  
  if (typeof location === 'string') {
    return location;
  }
  
  const parts = [];
  if (location.city) parts.push(location.city);
  if (location.state) parts.push(location.state);
  if (location.country && location.country !== 'US' && location.country !== 'USA') {
    parts.push(location.country);
  }
  
  return parts.join(', ');
};
