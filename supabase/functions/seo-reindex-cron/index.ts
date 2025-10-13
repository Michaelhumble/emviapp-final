import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const BATCH_SIZE = 200;
const MAX_RETRIES = 5;
const BASE_URL = 'https://www.emvi.app';

const SITEMAPS = [
  `${BASE_URL}/sitemap.xml`,
  `${BASE_URL}/sitemap-static.xml`,
  `${BASE_URL}/jobs-sitemap.xml`,
  `${BASE_URL}/salons-sitemap.xml`,
  `${BASE_URL}/artists-sitemap.xml`,
  `${BASE_URL}/city-sitemap.xml`,
  `${BASE_URL}/blog-sitemap.xml`
];

interface QueueItem {
  url: string;
  type: string;
  hash: string | null;
  tries: number;
}

/**
 * Call existing Google Indexing API function for JobPosting URLs
 */
async function notifyGoogleIndexing(url: string, supabaseUrl: string, supabaseKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/google-indexing`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'notify_job_upsert',
        url
      })
    });
    
    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error(`Google Indexing API failed for ${url}:`, error);
    return false;
  }
}

/**
 * Submit batch to IndexNow
 */
async function submitToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const indexNowKey = Deno.env.get('INDEXNOW_KEY');
    if (!indexNowKey) {
      console.warn('⚠️ INDEXNOW_KEY not configured, skipping IndexNow submission');
      return false;
    }
    
    const body = {
      host: 'www.emvi.app',
      key: indexNowKey,
      keyLocation: `${BASE_URL}/indexnow.txt`,
      urlList: urls
    };
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('IndexNow API error:', error);
      return false;
    }
    
    console.log(`✅ IndexNow: submitted ${urls.length} URLs`);
    return true;
  } catch (error) {
    console.error('IndexNow submission failed:', error);
    return false;
  }
}

/**
 * Ping Google with sitemap updates
 */
async function pingSitemaps(): Promise<number> {
  let successCount = 0;
  
  for (const sitemap of SITEMAPS) {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`;
      const response = await fetch(pingUrl, { method: 'GET' });
      
      if (response.ok) {
        successCount++;
      } else {
        console.warn(`Sitemap ping failed for ${sitemap}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Sitemap ping error for ${sitemap}:`, error);
    }
  }
  
  console.log(`📍 Sitemap pings: ${successCount}/${SITEMAPS.length} succeeded`);
  return successCount;
}

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('🚀 SEO Reindex Cron starting...');
    
    // Fetch queued items (oldest first, max retries not exceeded)
    const { data: queueItems, error: fetchError } = await supabase
      .from('seo_reindex_queue')
      .select('url, type, hash, tries')
      .eq('status', 'queued')
      .lt('tries', MAX_RETRIES)
      .order('lastmod', { ascending: true })
      .limit(BATCH_SIZE);
    
    if (fetchError) {
      console.error('Error fetching queue:', fetchError);
      throw fetchError;
    }
    
    if (!queueItems || queueItems.length === 0) {
      console.log('✅ Queue is empty, nothing to process');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Queue empty',
        processed: 0 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }
    
    console.log(`📦 Processing ${queueItems.length} queued URLs`);
    
    const jobUrls: string[] = [];
    const allUrls: string[] = [];
    const results: { url: string; success: boolean }[] = [];
    
    // Process each item
    for (const item of queueItems as QueueItem[]) {
      allUrls.push(item.url);
      
      // Only job URLs go through Google Indexing API
      if (item.type === 'job' && item.url.includes('/jobs/')) {
        jobUrls.push(item.url);
      }
    }
    
    // Submit job URLs to Google Indexing API
    let googleSuccess = 0;
    for (const url of jobUrls) {
      const success = await notifyGoogleIndexing(url, supabaseUrl, supabaseKey);
      if (success) googleSuccess++;
      results.push({ url, success });
    }
    
    // Submit all URLs to IndexNow
    const indexNowSuccess = await submitToIndexNow(allUrls);
    
    // Ping sitemaps
    const sitemapsPinged = await pingSitemaps();
    
    // Update queue items
    const successUrls = results.filter(r => r.success).map(r => r.url);
    const failedUrls = results.filter(r => !r.success).map(r => r.url);
    
    // Mark successes as sent
    if (successUrls.length > 0) {
      await supabase
        .from('seo_reindex_queue')
        .update({ status: 'sent', lastmod: new Date().toISOString() })
        .in('url', successUrls);
    }
    
    // Mark non-job URLs as sent (IndexNow only)
    const nonJobUrls = allUrls.filter(url => !jobUrls.includes(url));
    if (nonJobUrls.length > 0 && indexNowSuccess) {
      await supabase
        .from('seo_reindex_queue')
        .update({ status: 'sent', lastmod: new Date().toISOString() })
        .in('url', nonJobUrls);
    }
    
    // Increment tries for failures
    if (failedUrls.length > 0) {
      for (const url of failedUrls) {
        const item = queueItems.find(i => i.url === url) as QueueItem;
        const newTries = item.tries + 1;
        
        await supabase
          .from('seo_reindex_queue')
          .update({
            tries: newTries,
            status: newTries >= MAX_RETRIES ? 'error' : 'queued',
            lastmod: new Date().toISOString()
          })
          .eq('url', url);
      }
    }
    
    // Log to seo_indexing_logs
    await supabase
      .from('seo_indexing_logs')
      .insert({
        run_date: new Date().toISOString().split('T')[0],
        cities_processed: queueItems.length,
        cities_succeeded: successUrls.length + nonJobUrls.length,
        cities_failed: failedUrls.length,
        status: 'completed',
        completed_at: new Date().toISOString(),
        errors: failedUrls.length > 0 ? failedUrls : null
      });
    
    console.log(`\n=== Summary ===`);
    console.log(`Total processed: ${queueItems.length}`);
    console.log(`Google Indexing API: ${googleSuccess}/${jobUrls.length}`);
    console.log(`IndexNow: ${indexNowSuccess ? allUrls.length : 0} URLs`);
    console.log(`Sitemaps pinged: ${sitemapsPinged}/${SITEMAPS.length}`);
    console.log(`Successes: ${successUrls.length + nonJobUrls.length}`);
    console.log(`Failures: ${failedUrls.length}`);
    
    return new Response(JSON.stringify({
      success: true,
      processed: queueItems.length,
      google_indexing: { success: googleSuccess, total: jobUrls.length },
      indexnow: { success: indexNowSuccess, urls: allUrls.length },
      sitemaps_pinged: sitemapsPinged,
      sent: successUrls.length + nonJobUrls.length,
      failed: failedUrls.length
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error('SEO Reindex Cron error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
