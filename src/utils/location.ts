
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
