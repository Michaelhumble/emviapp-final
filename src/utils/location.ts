/**
 * Helper function to format location strings
 * @param city City name
 * @param state State name
 * @param country Optional country name
 * @returns Formatted location string
 */
export const getLocationString = (
  city?: string, 
  state?: string, 
  country?: string
): string => {
  const parts = [city, state, country].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : 'Location not specified';
};

/**
 * Extended helper function to handle different location formats
 * @param location Location data (can be string, Location object, or undefined)
 * @returns Formatted location string
 */
export const formatLocation = (
  location?: string | { city?: string; state?: string; country?: string; address?: string; }
): string => {
  // If location is undefined or null
  if (!location) return 'Location not specified';
  
  // If location is already a string
  if (typeof location === 'string') return location;
  
  // If location has an address string, use it
  if (location.address) return location.address;
  
  // Otherwise use individual parts
  return getLocationString(location.city, location.state, location.country);
};
