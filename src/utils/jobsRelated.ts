import { supabase } from '@/integrations/supabase/client';
import type { Job } from '@/types/job';

export async function fetchRelatedJobs(params: { category?: string; location?: string; limit?: number }): Promise<Job[]> {
  const { category, location, limit = 12 } = params;
  const city = (location || '').split(',')[0]?.trim();

  const query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  // Simple OR filter on category OR city in location
  const orFilters: string[] = [];
  if (category) orFilters.push(`category.eq.${category}`);
  if (city) orFilters.push(`location.ilike.%${city}%`);

  if (orFilters.length) {
    // @ts-ignore - supabase-js string expression
    query.or(orFilters.join(','));
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Job[];
}
