
import { useAuth } from "@/context/auth";

/**
 * Hook to determine if the current user is a new artist based on profile completion
 * @param completionThreshold - The threshold below which a user is considered new (default: 60%)
 * @returns Boolean indicating if the user is a new artist
 */
export function useNewArtistStatus(completionThreshold = 60) {
  const { userProfile } = useAuth();
  
  // Check if user has profile data and if their profile completion is below threshold
  const isNewArtist = !userProfile?.profile_completion || 
                      userProfile.profile_completion < completionThreshold;
  
  return isNewArtist;
}
