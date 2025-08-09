import { supabase } from "@/integrations/supabase/client";

export interface ArtistForHireListItem {
  user_id: string;
  specialties: string | null;
  location: string | null;
  headline: string | null;
  available_for_work: boolean | null;
  updated_at: string | null;
}

/**
 * Builds and executes the availability query with FOMO gating.
 * Public path first tries unavailable=false rows (as requested), then
 * falls back to staleness-based FOMO if RLS prevents access.
 */
export async function fetchArtistsForHire(isSignedIn: boolean, limit = 20): Promise<ArtistForHireListItem[]> {
  const sixtyDaysAgoISO = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

  // Optional kill switch via window.__env or import.meta.env
  const envFlag = (window as any)?.__env?.FOMO_LISTING_MODE ?? (import.meta as any)?.env?.FOMO_LISTING_MODE;
  const fomoEnabled = String(envFlag ?? 'true') !== 'false';

  if (!isSignedIn) {
    if (fomoEnabled) {
      // First attempt per spec: unavailable + fresh-looking
      const { data: attemptData, error: attemptError } = await (supabase as any)
        .from("artist_for_hire_profiles")
        .select("user_id, specialties, location, headline, available_for_work, updated_at")
        .eq("available_for_work" as any, false)
        .gte("updated_at" as any, sixtyDaysAgoISO)
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (!attemptError && attemptData && attemptData.length > 0) {
        return attemptData as ArtistForHireListItem[];
      }

      // RLS-safe fallback: still available but stale -> display as "Recently hired"
      const { data: fbData, error: fbError } = await (supabase as any)
        .from("artist_for_hire_profiles")
        .select("user_id, specialties, location, headline, available_for_work, updated_at")
        .eq("available_for_work" as any, true)
        .lte("updated_at" as any, sixtyDaysAgoISO)
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (fbError) throw fbError;
      return (fbData || []) as ArtistForHireListItem[];
    }
    // FOMO disabled: show authed behavior to everyone
    const { data, error } = await (supabase as any)
      .from("artist_for_hire_profiles")
      .select("user_id, specialties, location, headline, available_for_work, updated_at")
      .eq("available_for_work" as any, true)
      .gte("updated_at" as any, sixtyDaysAgoISO)
      .order("updated_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data || []) as ArtistForHireListItem[];
  }

  // Signed-in: actively available & fresh
  const { data, error } = await (supabase as any)
    .from("artist_for_hire_profiles")
    .select("user_id, specialties, location, headline, available_for_work, updated_at")
    .eq("available_for_work" as any, true)
    .gte("updated_at" as any, sixtyDaysAgoISO)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []) as ArtistForHireListItem[];
}
