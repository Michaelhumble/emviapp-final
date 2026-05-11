#!/usr/bin/env node
/**
 * Weekly EmviApp SEO Report
 * --------------------------------------------------------------
 * Lightweight, measurement-only report. Does NOT change the site.
 * Pulls 7-day vs prior-7-day data from Google Search Console and
 * sitemap status, then writes a Markdown report to /reports/.
 *
 * Required env (same creds used by scripts/gsc-pulls.mjs):
 *   GSC_CLIENT_EMAIL   service-account email
 *   GSC_PRIVATE_KEY    service-account private key (\n escaped)
 *   GSC_SITE_URL       optional, defaults to https://www.emvi.app/
 *
 * Usage:
 *   node scripts/weekly-seo-report.mjs
 *   node scripts/weekly-seo-report.mjs --weeks=4   # rolling window
 *
 * Output:
 *   reports/seo-weekly-YYYY-MM-DD.md
 *   .seo-cache/weekly-YYYY-MM-DD.json   (raw data, for trending)
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const SITE = process.env.GSC_SITE_URL || 'https://www.emvi.app/';
const OUT_DIR = 'reports';
const CACHE_DIR = '.seo-cache';
const SITEMAPS = [
  'https://www.emvi.app/sitemap.xml',
  'https://www.emvi.app/jobs-sitemap.xml',
];

const today = new Date();
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
};

// 7-day windows, ending 3 days ago (GSC has ~3-day lag)
const end = addDays(today, -3);
const start = addDays(end, -6);
const prevEnd = addDays(start, -1);
const prevStart = addDays(prevEnd, -6);

// ---------- Auth ----------
function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken() {
  const email = process.env.GSC_CLIENT_EMAIL;
  let key = process.env.GSC_PRIVATE_KEY;
  if (!email || !key) {
    console.log('ℹ️ GSC creds missing — report will be metadata-only.');
    return null;
  }
  key = key.replace(/\\n/g, '\n');

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(key);
  const jwt = `${unsigned}.${b64url(sig)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    console.log('⚠️ GSC token request failed:', res.status);
    return null;
  }
  const j = await res.json();
  return j.access_token;
}

// ---------- GSC queries ----------
async function gscQuery(token, body) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.log('⚠️ GSC query failed:', res.status, await res.text());
    return { rows: [] };
  }
  return res.json();
}

async function listSitemaps(token) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  const j = await res.json();
  return j.sitemap || [];
}

// ---------- Sitemap pings ----------
async function checkSitemap(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    const text = res.ok ? await res.text() : '';
    const isIndex = /<sitemapindex/.test(text);
    const locCount = (text.match(/<loc>/g) || []).length;
    const lastmod = (text.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || null;
    return { url, ok: res.ok, status: res.status, urls: locCount, kind: isIndex ? 'index' : 'urlset', lastmod };
  } catch (e) {
    return { url, ok: false, status: 0, error: String(e) };
  }
}

// ---------- Helpers ----------
function topRows(rows, key, n = 10) {
  return [...rows].sort((a, b) => b[key] - a[key]).slice(0, n);
}
function delta(a, b) { return (a || 0) - (b || 0); }
function pct(n) { return `${(n * 100).toFixed(1)}%`; }
function fmtRow(cells) { return `| ${cells.join(' | ')} |`; }

// Compare two rowsets keyed by `keys[0]`
function compareByKey(curr, prev) {
  const map = new Map();
  for (const r of prev) map.set(r.keys[0], r);
  return curr.map((r) => {
    const p = map.get(r.keys[0]) || { clicks: 0, impressions: 0 };
    return {
      key: r.keys[0],
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      ctr: r.ctr || 0,
      position: r.position || 0,
      dClicks: delta(r.clicks, p.clicks),
      dImpr: delta(r.impressions, p.impressions),
    };
  });
}

// ---------- Main ----------
async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(CACHE_DIR, { recursive: true });

  const token = await getAccessToken().catch((e) => {
    console.log('⚠️ GSC auth error, continuing sitemap-only:', e.message);
    return null;
  });
  const sitemapsLive = await Promise.all(SITEMAPS.map(checkSitemap));

  let pages = [], jobsPages = [], queries = [], lowCtr = [], smGsc = [];
  let prevPages = [];

  if (token) {
    const base = { startDate: iso(start), endDate: iso(end), rowLimit: 1000 };
    const basePrev = { startDate: iso(prevStart), endDate: iso(prevEnd), rowLimit: 1000 };

    const [pageR, pagePrevR, jobR, qR, smR] = await Promise.all([
      gscQuery(token, { ...base, dimensions: ['page'] }),
      gscQuery(token, { ...basePrev, dimensions: ['page'] }),
      gscQuery(token, {
        ...base, dimensions: ['page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: '/jobs' }] }],
      }),
      gscQuery(token, { ...base, dimensions: ['query'], rowLimit: 50 }),
      listSitemaps(token),
    ]);

    pages = compareByKey(pageR.rows || [], pagePrevR.rows || []);
    prevPages = pagePrevR.rows || [];
    jobsPages = (jobR.rows || []).map((r) => ({
      page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
    }));
    queries = (qR.rows || []).map((r) => ({
      query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
    }));
    lowCtr = pages
      .filter((p) => p.impressions >= 50 && p.ctr < 0.01)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 15);
    smGsc = smR;
  }

  // Cache raw data for trending
  const cachePath = path.join(CACHE_DIR, `weekly-${iso(today)}.json`);
  await fs.writeFile(cachePath, JSON.stringify({
    window: { start: iso(start), end: iso(end) },
    prev: { start: iso(prevStart), end: iso(prevEnd) },
    sitemapsLive, smGsc, pages, jobsPages, queries, lowCtr,
  }, null, 2));

  // ---------- Render Markdown ----------
  const lines = [];
  lines.push(`# EmviApp Weekly SEO Report`);
  lines.push(`_Generated ${iso(today)} · Window: ${iso(start)} → ${iso(end)} vs ${iso(prevStart)} → ${iso(prevEnd)}_`);
  lines.push('');
  lines.push(`**Goal:** measure whether Google is starting to understand EmviApp as a beauty hiring marketplace.`);
  lines.push('');

  // 1. Headline numbers
  const totals = pages.reduce((a, p) => ({
    clicks: a.clicks + p.clicks, impr: a.impr + p.impressions,
  }), { clicks: 0, impr: 0 });
  const prevTotals = prevPages.reduce((a, p) => ({
    clicks: a.clicks + (p.clicks || 0), impr: a.impr + (p.impressions || 0),
  }), { clicks: 0, impr: 0 });
  const indexedPages = pages.filter((p) => p.impressions > 0).length;
  const indexedJobs = jobsPages.filter((p) => p.impressions > 0).length;

  lines.push(`## 1. Headline numbers`);
  lines.push('');
  lines.push(fmtRow(['Metric', 'This week', 'Last week', 'Δ']));
  lines.push(fmtRow(['---', '---', '---', '---']));
  lines.push(fmtRow(['Clicks', totals.clicks, prevTotals.clicks, delta(totals.clicks, prevTotals.clicks)]));
  lines.push(fmtRow(['Impressions', totals.impr, prevTotals.impr, delta(totals.impr, prevTotals.impr)]));
  lines.push(fmtRow(['Pages w/ impressions (proxy: indexed)', indexedPages, '—', '—']));
  lines.push(fmtRow(['/jobs/* pages w/ impressions', indexedJobs, '—', '—']));
  lines.push('');

  // 2. Sitemap status
  lines.push(`## 2. Sitemap status`);
  lines.push('');
  lines.push(fmtRow(['Sitemap', 'HTTP', 'URLs', 'Last-mod']));
  lines.push(fmtRow(['---', '---', '---', '---']));
  for (const s of sitemapsLive) {
    lines.push(fmtRow([s.url, s.status, s.urls ?? '—', s.lastmod || '—']));
  }
  if (smGsc.length) {
    lines.push('');
    lines.push(`### GSC sitemap registry`);
    lines.push('');
    lines.push(fmtRow(['Sitemap', 'Submitted', 'Last downloaded', 'Warnings', 'Errors']));
    lines.push(fmtRow(['---', '---', '---', '---', '---']));
    for (const s of smGsc) {
      lines.push(fmtRow([s.path, s.lastSubmitted || '—', s.lastDownloaded || '—', s.warnings || 0, s.errors || 0]));
    }
  } else {
    lines.push('');
    lines.push(`> ⚠️ GSC sitemap registry not returned — verify sitemaps are submitted at https://search.google.com/search-console`);
  }
  lines.push('');

  // 3. Top gainers / losers
  lines.push(`## 3. Top gaining pages (Δ impressions)`);
  lines.push('');
  lines.push(fmtRow(['Page', 'Impr', 'Δ Impr', 'Clicks', 'Δ Clicks', 'CTR']));
  lines.push(fmtRow(['---', '---', '---', '---', '---', '---']));
  for (const p of topRows(pages, 'dImpr', 10)) {
    lines.push(fmtRow([p.key, p.impressions, p.dImpr, p.clicks, p.dClicks, pct(p.ctr)]));
  }
  lines.push('');
  lines.push(`## 4. Top losing pages (Δ impressions)`);
  lines.push('');
  lines.push(fmtRow(['Page', 'Impr', 'Δ Impr', 'Clicks', 'Δ Clicks', 'CTR']));
  lines.push(fmtRow(['---', '---', '---', '---', '---', '---']));
  for (const p of [...pages].sort((a, b) => a.dImpr - b.dImpr).slice(0, 10)) {
    lines.push(fmtRow([p.key, p.impressions, p.dImpr, p.clicks, p.dClicks, pct(p.ctr)]));
  }
  lines.push('');

  // 5. Hiring keywords
  const hiringQ = queries.filter((q) =>
    /\b(job|jobs|hire|hiring|salary|nail tech|nail technician|hair stylist|barber|esthetician|salon)\b/i.test(q.query)
  ).slice(0, 15);
  lines.push(`## 5. Top hiring-intent keywords`);
  lines.push('');
  lines.push(fmtRow(['Query', 'Clicks', 'Impr', 'CTR', 'Avg pos']));
  lines.push(fmtRow(['---', '---', '---', '---', '---']));
  for (const q of hiringQ) {
    lines.push(fmtRow([q.query, q.clicks, q.impressions, pct(q.ctr), q.position.toFixed(1)]));
  }
  if (!hiringQ.length) lines.push(`| _no hiring queries yet_ |  |  |  |  |`);
  lines.push('');

  // 6. Pages with impressions but low CTR (<1%)
  lines.push(`## 6. Pages with impressions but low CTR`);
  lines.push('_Candidates for title/meta rewrites — not new content._');
  lines.push('');
  lines.push(fmtRow(['Page', 'Impr', 'Clicks', 'CTR', 'Avg pos']));
  lines.push(fmtRow(['---', '---', '---', '---', '---']));
  for (const p of lowCtr) {
    lines.push(fmtRow([p.key, p.impressions, p.clicks, pct(p.ctr), p.position.toFixed(1)]));
  }
  if (!lowCtr.length) lines.push(`| _none yet_ |  |  |  |  |`);
  lines.push('');

  // 7. Manual checks
  lines.push(`## 7. Manual checks (do these in GSC weekly)`);
  lines.push('');
  lines.push(`- [ ] **Pages → Indexing**: indexed page count vs last week`);
  lines.push(`- [ ] **Pages → Why pages aren't indexed**: any new "Discovered – currently not indexed" or "Crawled – currently not indexed"`);
  lines.push(`- [ ] **Sitemaps**: \`jobs-sitemap.xml\` shows recent "Last read" date and 0 errors`);
  lines.push(`- [ ] **Enhancements → Job postings**: valid count growing, errors at 0`);
  lines.push(`- [ ] **Enhancements → Breadcrumbs**: valid count growing`);
  lines.push(`- [ ] **Performance → Search type: Job listing**: any clicks/impr from Google for Jobs`);
  lines.push(`- [ ] **Crawl stats**: total requests trend, no spike in 4xx/5xx`);
  lines.push(`- [ ] Spot-check 3 random \`/jobs/{role}/{city}\` URLs in URL Inspection`);
  lines.push('');

  lines.push(`---`);
  lines.push(`_Raw data: \`${cachePath}\`_`);

  const reportPath = path.join(OUT_DIR, `seo-weekly-${iso(today)}.md`);
  await fs.writeFile(reportPath, lines.join('\n'));
  console.log(`✅ Report written: ${reportPath}`);
  console.log(`   Cache: ${cachePath}`);
  if (!token) console.log(`   (GSC creds missing — only sitemap section is populated.)`);
}

main().catch((e) => {
  console.error('❌ Report failed:', e);
  process.exit(1);
});
