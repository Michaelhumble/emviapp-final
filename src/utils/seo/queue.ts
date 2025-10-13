/**
 * SEO Reindex Queue Management
 * Enqueue URLs for search engine re-indexing when content changes
 */

import { supabase } from '@/integrations/supabase/client';

export interface EnqueueOptions {
  url: string;
  type: 'job' | 'salon' | 'artist' | 'blog' | 'page';
  hash: string;
}

/**
 * Enqueue a URL for reindexing if its content hash has changed
 * Upserts with status='queued' and resets tries if hash differs
 */
export async function enqueueForReindex(options: EnqueueOptions): Promise<boolean> {
  try {
    const { url, type, hash } = options;
    
    // Skip URLs that should not be indexed
    if (shouldSkipUrl(url)) {
      return false;
    }
    
    // Check if URL already exists with same hash
    const { data: existing } = await supabase
      .from('seo_reindex_queue')
      .select('hash, status')
      .eq('url', url)
      .maybeSingle();
    
    // If hash is the same and already sent/queued, skip
    if (existing && existing.hash === hash && existing.status !== 'error') {
      return false;
    }
    
    // Upsert with new hash and reset to queued
    const { error } = await supabase
      .from('seo_reindex_queue')
      .upsert({
        url,
        type,
        hash,
        status: 'queued',
        tries: 0,
        lastmod: new Date().toISOString()
      }, {
        onConflict: 'url'
      });
    
    if (error) {
      console.error('Failed to enqueue URL for reindexing:', error);
      return false;
    }
    
    console.log(`✅ Enqueued ${type} for reindexing: ${url}`);
    return true;
  } catch (error) {
    console.error('Error enqueueing for reindex:', error);
    return false;
  }
}

/**
 * Check if a URL should be skipped from indexing
 */
function shouldSkipUrl(url: string): boolean {
  const skipPatterns = [
    '/auth/',
    '/dashboard/',
    '/checkout/',
    '/admin/',
    '/api/',
    '/settings/',
    '/account/',
    '/login',
    '/signup',
    '/reset-password'
  ];
  
  return skipPatterns.some(pattern => url.includes(pattern));
}

/**
 * Batch enqueue multiple URLs
 */
export async function batchEnqueue(items: EnqueueOptions[]): Promise<number> {
  let count = 0;
  
  for (const item of items) {
    const success = await enqueueForReindex(item);
    if (success) count++;
  }
  
  return count;
}

/**
 * Get queue statistics (for admin dashboard)
 */
export async function getQueueStats() {
  try {
    const { data, error } = await supabase
      .from('seo_reindex_queue')
      .select('status, type')
      .limit(10000);
    
    if (error) throw error;
    
    const stats = {
      queued: 0,
      sent: 0,
      error: 0,
      byType: {} as Record<string, number>
    };
    
    data?.forEach(item => {
      if (item.status === 'queued') stats.queued++;
      else if (item.status === 'sent') stats.sent++;
      else if (item.status === 'error') stats.error++;
      
      stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting queue stats:', error);
    return null;
  }
}
