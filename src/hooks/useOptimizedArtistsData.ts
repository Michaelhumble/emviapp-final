import { useMemo } from "react";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { fetchArtistsForHire, ArtistForHireListItem } from "@/utils/getArtistAvailabilityQuery";

interface Options {
  isSignedIn: boolean;
  limit?: number;
}

export function useOptimizedArtistsData({ isSignedIn, limit }: Options) {
  const effectiveLimit = useMemo(() => limit ?? (isSignedIn ? 50 : 20), [isSignedIn, limit]);
  const cacheKey = isSignedIn ? `artists:authed:${effectiveLimit}` : `artists:public:${effectiveLimit}`;

  const { data, isLoading, error } = useSafeQuery<ArtistForHireListItem[]>({
    queryKey: [cacheKey],
    context: "useOptimizedArtistsData",
    queryFn: async () => await fetchArtistsForHire(isSignedIn, effectiveLimit),
    fallbackData: [],
    retryCount: 2,
  });

  return { artists: data || [], loading: isLoading, error: error?.message || '' };
}
