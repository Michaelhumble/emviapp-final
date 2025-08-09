// Dev-only demo seeds for preview environments
import { supabaseBypass } from '@/types/supabase-bypass';

const STORAGE_KEY = 'emvi_demo_salon_created_at';

async function markExpiredSalons(n: number = 3) {
  try {
    const { data: candidates, error } = await (supabaseBypass as any)
      .from('salon_sales')
      .select('id, created_at, status')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(n);

    if (error) throw error;
    if (!candidates || candidates.length === 0) {
      console.info('[SEED] No active salons found to mark as stale');
      return { updated: 0 };
    }

    const pastISO = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString();
    const ids = candidates.map((c: any) => c.id);

    // Persist originals for clean revert
    const existingMap = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    candidates.forEach((c: any) => {
      existingMap[c.id] = c.created_at;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingMap));

    const { error: updErr } = await (supabaseBypass as any)
      .from('salon_sales')
      .update({ created_at: pastISO })
      .in('id', ids);
    if (updErr) throw updErr;

    console.info('[SEED] Marked salons as stale (45d ago):', ids);
    console.info('[SEED] Revert tip: window.__revertExpiredSalons()');
    return { updated: ids.length, ids };
  } catch (e) {
    console.error('[SEED] Error marking salons stale:', e);
    return { updated: 0, error: String(e) };
  }
}

async function revertExpiredSalons() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.info('[SEED] No stored salon timestamps to revert');
      return { reverted: 0 };
    }
    const map: Record<string, string> = JSON.parse(raw);
    const entries = Object.entries(map);
    if (entries.length === 0) {
      console.info('[SEED] No stored salon timestamps to revert');
      return { reverted: 0 };
    }

    const revertedIds: string[] = [];
    for (const [id, originalCreatedAt] of entries) {
      const { error: updErr } = await (supabaseBypass as any)
        .from('salon_sales')
        .update({ created_at: originalCreatedAt })
        .eq('id', id);
      if (!updErr) revertedIds.push(id);
    }

    localStorage.removeItem(STORAGE_KEY);
    console.info('[SEED] Reverted salon created_at for IDs:', revertedIds);
    return { reverted: revertedIds.length, ids: revertedIds };
  } catch (e) {
    console.error('[SEED] Error reverting salons:', e);
    return { reverted: 0, error: String(e) };
  }
}

// Expose globally in non-production only
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__markExpiredSalons = markExpiredSalons;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__revertExpiredSalons = revertExpiredSalons;
}
