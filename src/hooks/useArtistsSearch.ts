import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ArtistListItem } from "@/hooks/useOptimizedArtistsData";

export type SortOption = "updated" | "experience" | "rate";

export interface ArtistsFiltersState {
  q: string;
  location: string;
  specialty: string;
  available: boolean;
  vietnamese: boolean; // will be ignored if field not present
  sort: SortOption;
}

const DEFAULT_LIMIT = 24;

export function useArtistsSearch(initial: Partial<ArtistsFiltersState> = {}) {
  const [filters, setFilters] = useState<ArtistsFiltersState>({
    q: initial.q ?? "",
    location: initial.location ?? "",
    specialty: initial.specialty ?? "",
    available: initial.available ?? true,
    vietnamese: initial.vietnamese ?? false,
    sort: initial.sort ?? "updated",
  });

  const [items, setItems] = useState<ArtistListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [specialtyChips, setSpecialtyChips] = useState<string[]>([]);
  const [featured, setFeatured] = useState<ArtistListItem[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  // Detect if language field exists (best-effort; skip if not)
  const hasLanguageField = false; // table doesn't expose this in schema list; keep false

  const fields = "id, user_id, headline, specialties, location, available_for_work, hourly_rate, avatar_url, years_experience, shifts_available, bio, updated_at";

  const buildQuery = () => {
    let query = (supabase as any)
      .from("artist_for_hire_profiles")
      .select(fields, { count: "exact" }) as any;

    if (filters.available) {
      query = query.eq("available_for_work" as any, true);
    }

    // Search across headline, bio, specialties
    if (filters.q && filters.q.trim().length > 0) {
      const term = `%${filters.q.trim()}%`;
      query = query.or(`headline.ilike.${term},bio.ilike.${term},specialties.ilike.${term}` as any);
    }

    if (filters.location && filters.location.trim().length > 0) {
      const term = `%${filters.location.trim()}%`;
      query = query.ilike("location" as any, term);
    }

    if (filters.specialty && filters.specialty.trim().length > 0) {
      const term = `%${filters.specialty.trim()}%`;
      query = query.ilike("specialties" as any, term);
    }

    // Optional language filter (ignored if not present)
    if (hasLanguageField && filters.vietnamese) {
      query = query.ilike("preferred_language" as any, "%Vietnamese%");
    }

    // Sorting
    if (filters.sort === "updated") {
      query = query.order("updated_at", { ascending: false });
      query = query.order("years_experience" as any, { ascending: false });
    } else if (filters.sort === "experience") {
      query = query.order("years_experience" as any, { ascending: false });
      query = query.order("updated_at", { ascending: false });
    } else if (filters.sort === "rate") {
      query = query.order("hourly_rate" as any, { ascending: true, nullsFirst: false });
      query = query.order("updated_at", { ascending: false });
    }

    return query;
  };

  const fetchPage = async (pageIndex: number) => {
    setLoading(true);
    setError("");

    // Abort previous
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const from = pageIndex * DEFAULT_LIMIT;
    const to = from + DEFAULT_LIMIT - 1;

    try {
      let query = buildQuery();
      const { data, error } = await query.range(from, to);
      if (error) throw error;
      const normalized = (data || []).map((a: any) => ({ ...a, user_id: a.user_id || a.id })) as ArtistListItem[];
      if (pageIndex === 0) {
        setItems(normalized);
      } else {
        setItems(prev => [...prev, ...normalized]);
      }
      setHasMore((data || []).length === DEFAULT_LIMIT);
    } catch (e: any) {
      if (e?.name === "AbortError") return; // ignore
      setError(e?.message || "Failed to load artists");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    setPage(0);
    fetchPage(0);
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  // Fetch on filters change
  useEffect(() => {
    // Fire analytics event
    try {
      window.dispatchEvent(new CustomEvent("ArtistsFilterChanged", { detail: { filters } }));
    } catch {}
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.location, filters.specialty, filters.available, filters.vietnamese, filters.sort]);

  // Initial load + analytics
  useEffect(() => {
    try {
      window.dispatchEvent(new CustomEvent("ArtistsIndexViewed", { detail: { ts: Date.now() } }));
    } catch {}
    fetchPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build specialties chips from first 200 rows
  useEffect(() => {
    (async () => {
      try {
        const { data } = await (supabase as any)
          .from("artist_for_hire_profiles")
          .select("specialties")
          .limit(200);
        const setVals = new Set<string>();
        (data || []).forEach((row: any) => {
          const raw = String(row?.specialties || "");
          raw.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => setVals.add(s));
        });
        setSpecialtyChips(Array.from(setVals).slice(0, 20));
      } catch {}
    })();
  }, []);

  // Optional featured pros (skip if column doesn't exist)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await (supabase as any)
          .from("artist_for_hire_profiles")
          .select(fields)
          .eq("is_featured" as any, true)
          .order("updated_at", { ascending: false })
          .limit(6);
        const normalized = (data || []).map((a: any) => ({ ...a, user_id: a.user_id || a.id })) as ArtistListItem[];
        setFeatured(normalized);
      } catch {
        setFeatured([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPartialFilters = (patch: Partial<ArtistsFiltersState>) => setFilters((f) => ({ ...f, ...patch }));

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    filters,
    setFilters: setPartialFilters,
    specialtyChips,
    featured,
    hasLanguageField,
  };
}
