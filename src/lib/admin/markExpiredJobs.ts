import { supabaseBypass } from '@/types/supabase-bypass';

// One-off admin util: mark a few jobs as expired for demo
// Usage in browser console: window.__markExpiredJobs(3)
export async function markSomeJobsExpired(count: number = 3) {
  try {
    const pastISO = '2025-06-01T00:00:00.000Z';
    // Pick older active jobs (created_at ascending) that are not already expired
    const nowISO = new Date().toISOString();
    const { data: candidates, error } = await (supabaseBypass as any)
      .from('jobs')
      .select('id, created_at, expires_at, status')
      .eq('status', 'active')
      .or(`expires_at.is.null,expires_at.gt.${nowISO}`)
      .order('created_at', { ascending: true })
      .limit(count);

    if (error) throw error;
    if (!candidates || candidates.length === 0) {
      console.warn('[SEED] No suitable jobs found to mark expired');
      return { updated: 0 };
    }

    const ids = candidates.map((c: any) => c.id);
    const { error: updErr } = await (supabaseBypass as any)
      .from('jobs')
      .update({ expires_at: pastISO })
      .in('id', ids);

    if (updErr) throw updErr;
    console.log('[SEED] Marked expired job IDs:', ids);
    console.log('[SEED] Rollback tip: set expires_at to null or a future ISO for these ids.');
    return { updated: ids.length, ids };
  } catch (e) {
    console.error('[SEED] Error marking jobs expired:', e);
    return { updated: 0, error: String(e) };
  }
}

// Expose helper globally for one-off use
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).__markExpiredJobs = markSomeJobsExpired;
