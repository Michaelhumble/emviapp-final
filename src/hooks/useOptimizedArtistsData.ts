import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export interface ArtistForHireListItem {
  id?: string;
  user_id: string;
  specialties: string | null;
  location: string | null;
  headline: string | null;
  available_for_work: boolean | null;
  updated_at: string | null;
}

interface UseOptimizedArtistsDataOptions {
  limit?: number; // default differs for public vs signed-in
}

export function useOptimizedArtistsData(options: UseOptimizedArtistsDataOptions = {}) {
  const { isSignedIn } = useAuth();
  const [artists, setArtists] = useState<ArtistForHireListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const cutoffIso = useMemo(() => {
    const dt = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000); // 60 days
    return dt.toISOString();
  }, []);

  const effectiveLimit = options.limit ?? (isSignedIn ? 50 : 20);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError("");

        let query = supabase
          .from("artist_for_hire_profiles")
          .select("id,user_id,specialties,location,headline,available_for_work,updated_at")
          .order("updated_at", { ascending: false });

        if (isSignedIn) {
          // Signed-in: available AND fresh (<=60 days old)
          query = query
            .eq("available_for_work" as any, true)
            .gt("updated_at" as any, cutoffIso)
            .limit(effectiveLimit);
        } else {
          // Public FOMO: show stale profiles (60+ days old)
          // Note: RLS allows public SELECT only when available_for_work = true.
          // We rely on staleness to represent "Unavailable" state visually.
          query = query
            .eq("available_for_work" as any, true)
            .lte("updated_at" as any, cutoffIso)
            .limit(effectiveLimit);
        }

        const { data, error } = await query;
        if (error) throw error;

        setArtists((data || []) as ArtistForHireListItem[]);
      } catch (e: any) {
        console.error("Error fetching artists for hire:", e);
        setError(e?.message || "Failed to load artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [isSignedIn, cutoffIso, effectiveLimit]);

  return { artists, loading, error };
}
