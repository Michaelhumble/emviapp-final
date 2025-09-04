import { supabaseBypass } from '@/types/supabase-bypass';

export interface IndexingResponse {
  success: boolean;
  action: string;
  result?: any;
  error?: string;
}

export interface SitemapPingResult {
  sitemap: string;
  status: number;
  success: boolean;
  response?: string;
  error?: string;
}

/**
 * Notify Google Indexing API about a new or updated job posting
 */
export async function notifyJobUpsert(url: string): Promise<IndexingResponse> {
  try {
    console.log('🔍 Notifying Google about job upsert:', url);
    
    const { data, error } = await supabaseBypass.functions.invoke('google-indexing', {
      body: {
        action: 'notify_job_upsert',
        url
      }
    });

    if (error) {
      console.error('Error calling Google Indexing API:', error);
      return {
        success: false,
        action: 'notify_job_upsert',
        error: error.message
      };
    }

    console.log('✅ Google Indexing API success for job upsert');
    return data;
  } catch (error: any) {
    console.error('Failed to notify Google about job upsert:', error);
    return {
      success: false,
      action: 'notify_job_upsert',
      error: error.message
    };
  }
}

/**
 * Notify Google Indexing API about a removed/expired job posting
 */
export async function notifyJobRemove(url: string): Promise<IndexingResponse> {
  try {
    console.log('🗑️ Notifying Google about job removal:', url);
    
    const { data, error } = await supabaseBypass.functions.invoke('google-indexing', {
      body: {
        action: 'notify_job_remove',
        url
      }
    });

    if (error) {
      console.error('Error calling Google Indexing API:', error);
      return {
        success: false,
        action: 'notify_job_remove',
        error: error.message
      };
    }

    console.log('✅ Google Indexing API success for job removal');
    return data;
  } catch (error: any) {
    console.error('Failed to notify Google about job removal:', error);
    return {
      success: false,
      action: 'notify_job_remove',
      error: error.message
    };
  }
}

/**
 * Ping Google with sitemap updates
 */
export async function pingSitemaps(sitemaps?: string[]): Promise<IndexingResponse> {
  try {
    console.log('📍 Pinging Google with sitemap updates');
    
    const { data, error } = await supabaseBypass.functions.invoke('google-indexing', {
      body: {
        action: 'ping_sitemaps',
        sitemaps: sitemaps || [
          'https://www.emvi.app/sitemap.xml',
          'https://www.emvi.app/sitemaps/news.xml'
        ]
      }
    });

    if (error) {
      console.error('Error pinging sitemaps:', error);
      return {
        success: false,
        action: 'ping_sitemaps',
        error: error.message
      };
    }

    console.log('✅ Sitemap ping success');
    return data;
  } catch (error: any) {
    console.error('Failed to ping sitemaps:', error);
    return {
      success: false,
      action: 'ping_sitemaps',
      error: error.message
    };
  }
}

/**
 * Generate job URL for indexing notifications
 */
export function generateJobUrl(jobId: string, title?: string, location?: string, category = 'jobs'): string {
  // Generate SEO-friendly slug if we have title and location
  if (title && location) {
    const titleSlug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const locationSlug = location.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    return `https://www.emvi.app/${category}/${titleSlug}-${locationSlug}-${jobId}`;
  }
  
  // Fallback to simple job ID URL
  return `https://www.emvi.app/jobs/${jobId}`;
}

/**
 * Helper to get recent indexing logs (for admin page)
 */
export async function getIndexingLogs(limit = 50) {
  try {
    const { data, error } = await supabaseBypass
      .from('indexing_logs' as any)
      .select('*')
      .order('created_at' as any, { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching indexing logs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch indexing logs:', error);
    return [];
  }
}