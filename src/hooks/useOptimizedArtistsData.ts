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
  // Preview synth: if forced visible and empty, create placeholders (non-production only)
  let artistsToReturn: ArtistForHireListItem[] = data || [];
  if (import.meta.env.MODE !== 'production') {
    try {
      const force = (window as any)?.__env?.PREVIEW_FORCE_VISIBLE;
      if (force && (artistsToReturn?.length ?? 0) === 0) {
        artistsToReturn = Array.from({ length: 6 }).map((_, i) => ({
          user_id: `demo-artist-${i + 1}`,
          specialties: ['Nails · Gel · Dip', 'Hair · Color', 'Makeup'][i % 3] as any,
          location: ['USA · GA', 'USA · TX', 'USA · CA', 'USA · FL', 'USA · WA', 'USA · IL'][i % 6],
          headline: 'Preview demo artist',
          available_for_work: i % 2 === 0,
        })) as any;
      }
    } catch {}
  }

  return { artists: artistsToReturn, loading: isLoading, error: error?.message || '' };
