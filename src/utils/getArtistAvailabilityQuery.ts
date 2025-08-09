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
      const attempt = await supabase
        .from("artist_for_hire_profiles")
        .select("user_id, specialties, location, headline, available_for_work, updated_at")
        .eq("available_for_work" as any, false)
        .gte("updated_at" as any, sixtyDaysAgoISO)
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (!attempt.error && attempt.data && attempt.data.length > 0) {
        return attempt.data as ArtistForHireListItem[];
      }

      // RLS-safe fallback: still available but stale -> display as "Recently hired"
      const fallback = await supabase
        .from("artist_for_hire_profiles")
        .select("user_id, specialties, location, headline, available_for_work, updated_at")
        .eq("available_for_work" as any, true)
        .lte("updated_at" as any, sixtyDaysAgoISO)
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (fallback.error) throw fallback.error;
      return (fallback.data || []) as ArtistForHireListItem[];
    }
    // FOMO disabled: show authed behavior to everyone
    const res = await supabase
      .from("artist_for_hire_profiles")
      .select("user_id, specialties, location, headline, available_for_work, updated_at")
      .eq("available_for_work" as any, true)
      .gte("updated_at" as any, sixtyDaysAgoISO)
      .order("updated_at", { ascending: false })
      .limit(limit);
    if (res.error) throw res.error;
    return (res.data || []) as ArtistForHireListItem[];
  }

  // Signed-in: actively available & fresh
  const res = await supabase
    .from("artist_for_hire_profiles")
    .select("user_id, specialties, location, headline, available_for_work, updated_at")
    .eq("available_for_work" as any, true)
    .gte("updated_at" as any, sixtyDaysAgoISO)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (res.error) throw res.error;
  return (res.data || []) as ArtistForHireListItem[];
}
