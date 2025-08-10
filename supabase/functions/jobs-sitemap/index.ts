// Public Edge Function to serve Jobs sitemap and daily shards
// Routes:
//  - /jobs-sitemap.xml (index)
//  - /jobs-sitemaps/sitemap-YYYY-MM-DD.xml (daily shard)
// Also supports optional ?ping=1 to notify search engines.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = 'https://wwhqbjrhbajpabfdwnip.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM';
const BASE_URL = 'https://www.emvi.app';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>';
}

function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString();
}

async function fetchActiveJobsUpdatedOn(dateStr?: string) {
  const nowIso = new Date().toISOString();
  let query = supabase
    .from('jobs')
    .select('id, updated_at, expires_at, status')
    .eq('status', 'active')
    .or('expires_at.is.null,expires_at.gt.' + nowIso)
    .order('updated_at', { ascending: false })
    .limit(50000);

  if (dateStr) {
    // Filter by updated_at date (UTC)
    const start = new Date(dateStr + 'T00:00:00Z').toISOString();
    const end = new Date(dateStr + 'T23:59:59Z').toISOString();
    query = query.gte('updated_at', start).lte('updated_at', end);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

async function handleIndex(url: URL) {
  const today = new Date();
  const y = today.getUTCFullYear();
  const m = String(today.getUTCMonth() + 1).padStart(2, '0');
  const d = String(today.getUTCDate()).padStart(2, '0');
  const shardPath = `${BASE_URL}/jobs-sitemaps/sitemap-${y}-${m}-${d}.xml`;

  const xml = [
    xmlHeader(),
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap>`,
    `    <loc>${shardPath}</loc>`,
    `    <lastmod>${formatDate(today)}</lastmod>`,
    `  </sitemap>`,
    '</sitemapindex>'
  ].join('\n');

  // Optional ping
  if (url.searchParams.get('ping') === '1') {
    const encoded = encodeURIComponent(shardPath);
    try { await fetch(`https://www.google.com/ping?sitemap=${encoded}`); } catch {}
    try { await fetch(`https://www.bing.com/ping?sitemap=${encoded}`); } catch {}
  }

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300, s-maxage=600', ...corsHeaders } });
}

async function handleDaily(dateStr: string) {
  const jobs = await fetchActiveJobsUpdatedOn(dateStr);

  const urls = jobs.map((j: any) => {
    const loc = `${BASE_URL}/jobs/${j.id}`;
    const lastmod = formatDate(j.updated_at || new Date());
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  });

  const xml = [
    xmlHeader(),
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>'
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300, s-maxage=600', ...corsHeaders } });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname.endsWith('/jobs-sitemap.xml')) {
      return await handleIndex(url);
    }

    const match = pathname.match(/\/jobs-sitemaps\/sitemap-(\d{4}-\d{2}-\d{2})\.xml$/);
    if (match) {
      const dateStr = match[1];
      return await handleDaily(dateStr);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (e) {
    console.error('Sitemap error', e);
    return new Response('Server Error', { status: 500, headers: corsHeaders });
  }
});
