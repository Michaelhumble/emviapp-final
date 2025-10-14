import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QueueStats {
  queued: number;
  sent: number;
  error: number;
  total: number;
}

interface APIStats {
  google_200: number;
  google_403: number;
  google_429: number;
  google_other: number;
  indexnow_202: number;
  indexnow_400: number;
  indexnow_other: number;
}

interface SitemapStats {
  total_pinged: number;
  total_attempts: number;
  success_rate: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('📊 [WEEKLY SEO HEALTH] Starting report generation...');

    // 1. Get queue stats
    const { data: queueData } = await supabase
      .from('seo_reindex_queue')
      .select('status');

    const queueStats: QueueStats = {
      queued: 0,
      sent: 0,
      error: 0,
      total: 0
    };

    if (queueData) {
      queueStats.total = queueData.length;
      queueData.forEach((item: any) => {
        if (item.status === 'queued') queueStats.queued++;
        else if (item.status === 'sent') queueStats.sent++;
        else if (item.status === 'error') queueStats.error++;
      });
    }

    // 2. Get last 7 days of cron run stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentRuns } = await supabase
      .from('seo_indexing_logs')
      .select('*')
      .gte('completed_at', sevenDaysAgo.toISOString())
      .order('completed_at', { ascending: false });

    // Calculate cron success rate
    const totalRuns = recentRuns?.length || 0;
    const successfulRuns = recentRuns?.filter(
      (run: any) => run.status === 'completed' || run.status === 'success'
    ).length || 0;
    const cronSuccessRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;

    // 3. Parse API stats from metadata
    const apiStats: APIStats = {
      google_200: 0,
      google_403: 0,
      google_429: 0,
      google_other: 0,
      indexnow_202: 0,
      indexnow_400: 0,
      indexnow_other: 0
    };

    let totalSitemapsPinged = 0;
    let totalSitemapAttempts = 0;

    recentRuns?.forEach((run: any) => {
      const metadata = run.metadata || {};
      
      // Google Indexing API stats
      if (metadata.google_indexing) {
        const statusCode = metadata.google_indexing.status_code || 
                          metadata.google_indexing.google_status_code;
        if (statusCode === 200) apiStats.google_200++;
        else if (statusCode === 403) apiStats.google_403++;
        else if (statusCode === 429) apiStats.google_429++;
        else if (statusCode) apiStats.google_other++;
      }

      // IndexNow stats
      if (metadata.indexnow) {
        const statusCode = metadata.indexnow.status_code;
        if (statusCode === 202) apiStats.indexnow_202++;
        else if (statusCode === 400) apiStats.indexnow_400++;
        else if (statusCode) apiStats.indexnow_other++;
      }

      // Sitemap ping stats
      if (metadata.sitemaps_pinged !== undefined) {
        totalSitemapsPinged += metadata.sitemaps_pinged;
        totalSitemapAttempts += 7; // 7 sitemaps total
      }
    });

    const sitemapStats: SitemapStats = {
      total_pinged: totalSitemapsPinged,
      total_attempts: totalSitemapAttempts,
      success_rate: totalSitemapAttempts > 0 
        ? (totalSitemapsPinged / totalSitemapAttempts) * 100 
        : 0
    };

    // 4. Calculate overall automation success rate
    const googleSuccessRate = (apiStats.google_200 + apiStats.google_403 + apiStats.google_429 + apiStats.google_other) > 0
      ? (apiStats.google_200 / (apiStats.google_200 + apiStats.google_403 + apiStats.google_429 + apiStats.google_other)) * 100
      : 0;

    const indexnowSuccessRate = (apiStats.indexnow_202 + apiStats.indexnow_400 + apiStats.indexnow_other) > 0
      ? (apiStats.indexnow_202 / (apiStats.indexnow_202 + apiStats.indexnow_400 + apiStats.indexnow_other)) * 100
      : 0;

    const automationSuccessRate = (cronSuccessRate + googleSuccessRate + indexnowSuccessRate) / 3;

    // 5. Generate report summary
    const reportSummary = {
      report_date: new Date().toISOString(),
      queue: queueStats,
      cron: {
        total_runs: totalRuns,
        successful_runs: successfulRuns,
        success_rate: cronSuccessRate.toFixed(2) + '%'
      },
      google_indexing_api: {
        status_200: apiStats.google_200,
        status_403: apiStats.google_403,
        status_429: apiStats.google_429,
        other: apiStats.google_other,
        success_rate: googleSuccessRate.toFixed(2) + '%'
      },
      indexnow_api: {
        status_202: apiStats.indexnow_202,
        status_400: apiStats.indexnow_400,
        other: apiStats.indexnow_other,
        success_rate: indexnowSuccessRate.toFixed(2) + '%'
      },
      sitemap_pings: {
        total_pinged: sitemapStats.total_pinged,
        total_attempts: sitemapStats.total_attempts,
        success_rate: sitemapStats.success_rate.toFixed(2) + '%'
      },
      overall_automation_success: automationSuccessRate.toFixed(2) + '%'
    };

    // 6. Check thresholds and generate alerts
    const alerts: string[] = [];
    if (automationSuccessRate < 95) {
      alerts.push(`⚠️ Automation success rate is ${automationSuccessRate.toFixed(1)}% (threshold: 95%)`);
    }
    if (sitemapStats.success_rate < 80) {
      alerts.push(`⚠️ Sitemap ping success is ${sitemapStats.success_rate.toFixed(1)}% (threshold: 80%)`);
    }
    if (queueStats.queued > 500) {
      alerts.push(`⚠️ Queue backlog: ${queueStats.queued} URLs waiting`);
    }
    if (queueStats.error > 100) {
      alerts.push(`⚠️ High error count: ${queueStats.error} failed URLs`);
    }

    // 7. Write report to seo_indexing_logs
    const logEntry = {
      run_date: new Date().toISOString().split('T')[0],
      cities_processed: totalRuns,
      cities_succeeded: successfulRuns,
      cities_failed: totalRuns - successfulRuns,
      status: alerts.length === 0 ? 'success' : 'warning',
      errors: alerts.length > 0 ? { alerts } : null,
      metadata: reportSummary,
      completed_at: new Date().toISOString()
    };

    await supabase
      .from('seo_indexing_logs')
      .insert(logEntry);

    // 8. Log to console
    console.log('📊 [WEEKLY SEO HEALTH] Report Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📅 Period: Last 7 days (${sevenDaysAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()})`);
    console.log('');
    console.log('📦 QUEUE STATUS:');
    console.log(`   Total: ${queueStats.total}`);
    console.log(`   Queued: ${queueStats.queued}`);
    console.log(`   Sent: ${queueStats.sent}`);
    console.log(`   Error: ${queueStats.error}`);
    console.log('');
    console.log('⏰ CRON RUNS:');
    console.log(`   Total runs: ${totalRuns}`);
    console.log(`   Success rate: ${cronSuccessRate.toFixed(1)}%`);
    console.log('');
    console.log('🔍 GOOGLE INDEXING API:');
    console.log(`   200 OK: ${apiStats.google_200}`);
    console.log(`   403 Forbidden: ${apiStats.google_403}`);
    console.log(`   429 Rate Limit: ${apiStats.google_429}`);
    console.log(`   Success rate: ${googleSuccessRate.toFixed(1)}%`);
    console.log('');
    console.log('⚡ INDEXNOW API:');
    console.log(`   202 Accepted: ${apiStats.indexnow_202}`);
    console.log(`   400 Bad Request: ${apiStats.indexnow_400}`);
    console.log(`   Success rate: ${indexnowSuccessRate.toFixed(1)}%`);
    console.log('');
    console.log('🗺️  SITEMAP PINGS:');
    console.log(`   Total pinged: ${sitemapStats.total_pinged}/${sitemapStats.total_attempts}`);
    console.log(`   Success rate: ${sitemapStats.success_rate.toFixed(1)}%`);
    console.log('');
    console.log(`📈 OVERALL AUTOMATION SUCCESS: ${automationSuccessRate.toFixed(1)}%`);
    
    if (alerts.length > 0) {
      console.log('');
      console.log('🚨 ALERTS:');
      alerts.forEach(alert => console.log(`   ${alert}`));
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Weekly SEO Health Report: SUCCESS');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Weekly SEO Health Report: SUCCESS',
        summary: reportSummary,
        alerts: alerts,
        log_entry_created: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ [WEEKLY SEO HEALTH] Error generating report:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
