import { useMemo } from "react";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { supabase } from "@/integrations/supabase/client";

export interface ArtistListItem {
  id?: string;
  user_id?: string;
  headline?: string | null;
  specialties?: string | null;
  location?: string | null;
  available_for_work?: boolean | null;
  hourly_rate?: number | null;
  avatar_url?: string | null;
  years_experience?: number | null;
  shifts_available?: string | null;
  bio?: string | null;
}

interface Options {
  isSignedIn: boolean;
  limit?: number;
}

export function useOptimizedArtistsData({ isSignedIn, limit }: Options) {
  const effectiveLimit = useMemo(() => limit ?? 6, [limit]);
  const cacheKey = `artists:public:${effectiveLimit}:${isSignedIn ? 'authed' : 'anon'}`;

  const { data, isLoading, error } = useSafeQuery<ArtistListItem[]>({
    queryKey: [cacheKey],
    context: "useOptimizedArtistsData",
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("artist_for_hire_profiles")
        .select("id, user_id, headline, specialties, location, available_for_work, hourly_rate, avatar_url, years_experience, shifts_available, bio, updated_at")
        .eq("available_for_work" as any, true)
        .order("updated_at", { ascending: false })
        .limit(effectiveLimit);
      if (error) throw error;
      // Ensure user_id exists
      return (data || []).map((a: any) => ({
        ...a,
        user_id: a.user_id || a.id,
      })) as ArtistListItem[];
    },
    fallbackData: [],
    retryCount: 2,
  });

  return { artists: data || [], loading: isLoading, error: error?.message || "" };
}

// New hooks for browse and detail pages
export function useArtistsForHireList(params: { isSignedIn: boolean; limit?: number } ) {
  return useOptimizedArtistsData(params);
}

export function useArtistById(id?: string) {
  const cacheKey = `artist:detail:${id || 'none'}`;
  const { data, isLoading, error } = useSafeQuery<ArtistListItem | null>({
    queryKey: [cacheKey],
    context: "useArtistById",
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await (supabase as any)
        .from("artist_for_hire_profiles")
        .select("id, user_id, headline, specialties, location, available_for_work, hourly_rate, avatar_url, years_experience, shifts_available, bio, updated_at")
        .eq("id" as any, id)
        .maybeSingle();
      if (error) throw error;
      return data ? { ...data, user_id: (data as any).user_id || (data as any).id } as ArtistListItem : null;
    },
    fallbackData: null,
    retryCount: 2,
  });
  return { artist: data, loading: isLoading, error: error?.message || "" };
}
