import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";


export function useSupabaseBucketImages(bucket: string, { limit = 60 }: { limit?: number } = {}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {

        // List files (root of bucket)
        const { data, error } = await supabase.storage
          .from(bucket)
          .list("", { limit: 200, sortBy: { column: "name", order: "asc" } });

        if (error || !data) { setLoading(false); return; }

        const eligible = data
          .filter((f) => f.name && /\.(jpe?g|png|webp|gif|svg)$/i.test(f.name))
          .slice(0, limit);

        const mapped = eligible.map((f) => {
          const { data } = supabase.storage.from(bucket).getPublicUrl(f.name);
          return data.publicUrl;
        });

        if (!cancelled) setUrls(mapped);
      } catch {
        // swallow in preview
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [bucket, limit]);

  return { urls, loading };
}
