
/**
 * Hook to handle artist rating logic
 */
export const useArtistRating = () => {
  // Artist rating mock - would be from actual reviews in production
  const getArtistRating = (artistId: string): number => {
    // Using a deterministic random based on the ID for demonstration
    const hash = artistId.split('').reduce((a, b) => {
      return a + b.charCodeAt(0);
    }, 0);
    
    // Rating between 4.0 and 5.0
    return 4 + (hash % 10) / 10;
  };

  return { getArtistRating };
};
