import { useMemo } from "react";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { fetchArtistsForHire, ArtistForHireListItem } from "@/utils/getArtistAvailabilityQuery";
import { getDemoArtists } from "@/demo/seedOverlay";
import { isPreviewEnv } from "@/demo/demoFlags";
import { analytics } from "@/lib/analytics";

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

  // Demo overlay: if forced or empty/error in preview, use high-quality demo artists (no DB writes)
  let artistsToReturn: ArtistForHireListItem[] = data || [];
  const inPreview = import.meta.env.MODE !== 'production';
  const demoForced = inPreview && ((): boolean => { try { return !!(window as any).__DEMO_FORCE; } catch { return false; } })();

  if (inPreview && (demoForced || (artistsToReturn?.length ?? 0) === 0 || !!error)) {
    const capped = Math.min(typeof limit === 'number' ? limit : 6, 6);
    artistsToReturn = getDemoArtists(capped) as unknown as ArtistForHireListItem[];
  } else if (inPreview) {
    // Secondary preview synth only if explicitly requested and nothing else is available
    try {
      const forceVisible = (window as any)?.__env?.PREVIEW_FORCE_VISIBLE;
      if (forceVisible && (artistsToReturn?.length ?? 0) === 0) {
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

  // Listen for demo overlay seed/clear to re-evaluate without manual refresh
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useMemo(() => {
    if (!inPreview) return;
    const w = window as any;
    const onSeed = () => {
      try { (w.__reactQueryClient?.invalidateQueries as any)?.({ queryKey: [cacheKey] }); } catch {}
    };
    const onClear = onSeed;
    window.addEventListener('demo-overlay-seeded', onSeed);
    window.addEventListener('demo-overlay-cleared', onClear);
    return () => {
      window.removeEventListener('demo-overlay-seeded', onSeed);
      window.removeEventListener('demo-overlay-cleared', onClear);
    };
  }, [cacheKey, inPreview]);

  return { artists: artistsToReturn, loading: isLoading, error: error?.message || '' };
}