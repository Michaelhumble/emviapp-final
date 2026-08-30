import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Public job queries intentionally omit `contact_info` (poster email/phone) so
 * anonymous API clients can never scrape it. Signed-in users are still allowed
 * to read it, so we fetch it on demand for a single job when needed.
 */
export const useJobContactInfo = (jobId?: string, enabled: boolean = false) => {
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    if (!jobId || !enabled) {
      setContactInfo(null);
      return;
    }

    (async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('contact_info, metadata')
        .eq('id', jobId)
        .maybeSingle();

      if (cancelled || error || !data) return;
      const meta = (data as any).metadata;
      setContactInfo((data as any).contact_info || meta?.contact_info || null);
    })();

    return () => {
      cancelled = true;
    };
  }, [jobId, enabled]);

  return contactInfo;
};
