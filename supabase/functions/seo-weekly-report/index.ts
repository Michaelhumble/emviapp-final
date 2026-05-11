// Measurement-only weekly SEO report.
// Uses GOOGLE_SERVICE_ACCOUNT_JSON (already configured) to authenticate
// against Google Search Console. Does NOT modify the website.
//
// Invoke:
//   POST /seo-weekly-report           -> returns JSON summary + markdown
//   POST /seo-weekly-report?debug=1   -> includes raw section payloads

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

let SITE = Deno.env.get("GSC_SITE_URL") || "https://www.emvi.app/";
const SITE_CANDIDATES = [
  "sc-domain:emvi.app",
  "https://www.emvi.app/",
  "https://emvi.app/",
  "https://www.emvi.app",
  "https://emvi.app",
];
const SITEMAPS = [
  "https://www.emvi.app/sitemap.xml",
  "https://www.emvi.app/jobs-sitemap.xml",
];

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
};

function b64url(buf: ArrayBuffer | Uint8Array | string) {
  const bytes =
    typeof buf === "string"
      ? new TextEncoder().encode(buf)
      : buf instanceof Uint8Array
      ? buf
      : new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function pemToPkcs8(pem: string): Uint8Array {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const bin = atob(body);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function getAccessToken(): Promise<{ token: string | null; source: string; error?: string }> {
  // Prefer GOOGLE_SERVICE_ACCOUNT_JSON (already configured & known good)
  const json = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
  let email: string | undefined;
  let key: string | undefined;
  let source = "";

  if (json) {
    try {
      const sa = JSON.parse(json);
      email = sa.client_email;
      key = sa.private_key;
      source = "GOOGLE_SERVICE_ACCOUNT_JSON";
    } catch (e) {
      return { token: null, source: "GOOGLE_SERVICE_ACCOUNT_JSON", error: `JSON parse failed: ${e.message}` };
    }
  } else {
    email = Deno.env.get("GSC_CLIENT_EMAIL");
    key = Deno.env.get("GSC_PRIVATE_KEY");
    source = "GSC_CLIENT_EMAIL/GSC_PRIVATE_KEY";
  }

  if (!email || !key) return { token: null, source, error: "missing credentials" };
  key = key.replace(/\\n/g, "\n");

  try {
    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    };
    const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;

    const cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      pemToPkcs8(key),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sigBuf = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      cryptoKey,
      new TextEncoder().encode(unsigned),
    );
    const jwt = `${unsigned}.${b64url(sigBuf)}`;

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });
    const j = await res.json();
    if (!res.ok) return { token: null, source, error: `token endpoint ${res.status}: ${JSON.stringify(j)}` };
    return { token: j.access_token, source };
  } catch (e) {
    return { token: null, source, error: `signing failed: ${e.message}` };
  }
}

async function gscQuery(token: string, body: any) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    return { rows: [], _error: `${res.status}: ${text}` };
  }
  return await res.json();
}

async function listSitemaps(token: string) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  const j = await res.json();
  return j.sitemap || [];
}

async function checkSitemap(url: string) {
  try {
    const res = await fetch(url);
    const text = res.ok ? await res.text() : "";
    const isIndex = /<sitemapindex/.test(text);
    const locCount = (text.match(/<loc>/g) || []).length;
    const lastmod = (text.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || null;
    return { url, ok: res.ok, status: res.status, urls: locCount, kind: isIndex ? "index" : "urlset", lastmod };
  } catch (e) {
    return { url, ok: false, status: 0, error: String(e) };
  }
}

const delta = (a: number, b: number) => (a || 0) - (b || 0);
const pct = (n: number) => `${((n || 0) * 100).toFixed(1)}%`;
const fmtRow = (cells: any[]) => `| ${cells.join(" | ")} |`;
const topRows = (rows: any[], key: string, n = 10) =>
  [...rows].sort((a, b) => b[key] - a[key]).slice(0, n);

function compareByKey(curr: any[], prev: any[]) {
  const map = new Map(prev.map((r) => [r.keys[0], r]));
  return curr.map((r) => {
    const p = (map.get(r.keys[0]) as any) || { clicks: 0, impressions: 0 };
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

async function buildReport() {
  const today = new Date();
  const end = addDays(today, -3);
  const start = addDays(end, -6);
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -6);

  const auth = await getAccessToken();
  const sitemapsLive = await Promise.all(SITEMAPS.map(checkSitemap));

  let pages: any[] = [];
  let prevPages: any[] = [];
  let jobsPages: any[] = [];
  let queries: any[] = [];
  let lowCtr: any[] = [];
  let smGsc: any[] = [];
  const errors: Record<string, string> = {};

  if (auth.token) {
    const base = { startDate: iso(start), endDate: iso(end), rowLimit: 1000 };
    const basePrev = { startDate: iso(prevStart), endDate: iso(prevEnd), rowLimit: 1000 };

    const [pageR, pagePrevR, jobR, qR, smR] = await Promise.all([
      gscQuery(auth.token, { ...base, dimensions: ["page"] }),
      gscQuery(auth.token, { ...basePrev, dimensions: ["page"] }),
      gscQuery(auth.token, {
        ...base,
        dimensions: ["page"],
        dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "/jobs" }] }],
      }),
      gscQuery(auth.token, { ...base, dimensions: ["query"], rowLimit: 50 }),
      listSitemaps(auth.token),
    ]);

    if (pageR._error) errors.pages = pageR._error;
    if (jobR._error) errors.jobs = jobR._error;
    if (qR._error) errors.queries = qR._error;

    pages = compareByKey(pageR.rows || [], pagePrevR.rows || []);
    prevPages = pagePrevR.rows || [];
    jobsPages = (jobR.rows || []).map((r: any) => ({
      page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
    }));
    queries = (qR.rows || []).map((r: any) => ({
      query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
    }));
    lowCtr = pages
      .filter((p) => p.impressions >= 50 && p.ctr < 0.01)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 15);
    smGsc = smR;
  }

  // Render markdown
  const lines: string[] = [];
  lines.push(`# EmviApp Weekly SEO Report`);
  lines.push(`_Generated ${iso(today)} · Window: ${iso(start)} → ${iso(end)} vs ${iso(prevStart)} → ${iso(prevEnd)}_`);
  lines.push(`_Auth source: **${auth.source}** · ${auth.token ? "✅ authenticated" : "❌ " + (auth.error || "no token")}_`);
  lines.push("");

  const totals = pages.reduce((a, p) => ({ clicks: a.clicks + p.clicks, impr: a.impr + p.impressions }), { clicks: 0, impr: 0 });
  const prevTotals = prevPages.reduce((a, p: any) => ({ clicks: a.clicks + (p.clicks || 0), impr: a.impr + (p.impressions || 0) }), { clicks: 0, impr: 0 });
  const indexedPages = pages.filter((p) => p.impressions > 0).length;
  const indexedJobs = jobsPages.filter((p) => p.impressions > 0).length;

  lines.push(`## 1. Headline numbers`, "");
  lines.push(fmtRow(["Metric", "This week", "Last week", "Δ"]));
  lines.push(fmtRow(["---", "---", "---", "---"]));
  lines.push(fmtRow(["Clicks", totals.clicks, prevTotals.clicks, delta(totals.clicks, prevTotals.clicks)]));
  lines.push(fmtRow(["Impressions", totals.impr, prevTotals.impr, delta(totals.impr, prevTotals.impr)]));
  lines.push(fmtRow(["Pages w/ impressions (proxy: indexed)", indexedPages, "—", "—"]));
  lines.push(fmtRow(["/jobs/* pages w/ impressions", indexedJobs, "—", "—"]));
  lines.push("");

  lines.push(`## 2. Sitemap status`, "");
  lines.push(fmtRow(["Sitemap", "HTTP", "URLs", "Last-mod"]));
  lines.push(fmtRow(["---", "---", "---", "---"]));
  for (const s of sitemapsLive) lines.push(fmtRow([s.url, s.status, `${s.urls ?? "—"} (${s.kind || "—"})`, s.lastmod || "—"]));
  if (smGsc.length) {
    lines.push("", `### GSC sitemap registry`, "");
    lines.push(fmtRow(["Sitemap", "Submitted", "Last downloaded", "Warnings", "Errors"]));
    lines.push(fmtRow(["---", "---", "---", "---", "---"]));
    for (const s of smGsc) lines.push(fmtRow([s.path, s.lastSubmitted || "—", s.lastDownloaded || "—", s.warnings || 0, s.errors || 0]));
  } else {
    lines.push("", `> ⚠️ GSC sitemap registry empty — verify submissions in Search Console.`);
  }
  lines.push("");

  lines.push(`## 3. Top gaining pages (Δ impressions)`, "");
  lines.push(fmtRow(["Page", "Impr", "Δ Impr", "Clicks", "Δ Clicks", "CTR"]));
  lines.push(fmtRow(["---", "---", "---", "---", "---", "---"]));
  for (const p of topRows(pages, "dImpr", 10)) lines.push(fmtRow([p.key, p.impressions, p.dImpr, p.clicks, p.dClicks, pct(p.ctr)]));
  if (!pages.length) lines.push(`| _no data_ |  |  |  |  |  |`);
  lines.push("");

  lines.push(`## 4. Top losing pages (Δ impressions)`, "");
  lines.push(fmtRow(["Page", "Impr", "Δ Impr", "Clicks", "Δ Clicks", "CTR"]));
  lines.push(fmtRow(["---", "---", "---", "---", "---", "---"]));
  for (const p of [...pages].sort((a, b) => a.dImpr - b.dImpr).slice(0, 10)) lines.push(fmtRow([p.key, p.impressions, p.dImpr, p.clicks, p.dClicks, pct(p.ctr)]));
  if (!pages.length) lines.push(`| _no data_ |  |  |  |  |  |`);
  lines.push("");

  const hiringQ = queries.filter((q) =>
    /\b(job|jobs|hire|hiring|salary|nail tech|nail technician|hair stylist|barber|esthetician|salon)\b/i.test(q.query),
  ).slice(0, 15);
  lines.push(`## 5. Top hiring-intent keywords`, "");
  lines.push(fmtRow(["Query", "Clicks", "Impr", "CTR", "Avg pos"]));
  lines.push(fmtRow(["---", "---", "---", "---", "---"]));
  for (const q of hiringQ) lines.push(fmtRow([q.query, q.clicks, q.impressions, pct(q.ctr), q.position.toFixed(1)]));
  if (!hiringQ.length) lines.push(`| _no hiring queries yet_ |  |  |  |  |`);
  lines.push("");

  lines.push(`## 6. Pages with impressions but low CTR`, `_Candidates for title/meta rewrites — not new content._`, "");
  lines.push(fmtRow(["Page", "Impr", "Clicks", "CTR", "Avg pos"]));
  lines.push(fmtRow(["---", "---", "---", "---", "---"]));
  for (const p of lowCtr) lines.push(fmtRow([p.key, p.impressions, p.clicks, pct(p.ctr), p.position.toFixed(1)]));
  if (!lowCtr.length) lines.push(`| _none yet_ |  |  |  |  |`);
  lines.push("");

  lines.push(`## 7. Manual checks (do these in GSC weekly)`, "");
  lines.push(`- [ ] **Pages → Indexing**: indexed page count vs last week`);
  lines.push(`- [ ] **Pages → Why pages aren't indexed**: new "Discovered/Crawled – not indexed"`);
  lines.push(`- [ ] **Sitemaps**: \`jobs-sitemap.xml\` recent "Last read" + 0 errors`);
  lines.push(`- [ ] **Enhancements → Job postings**: valid count growing, errors 0`);
  lines.push(`- [ ] **Enhancements → Breadcrumbs**: valid count growing`);
  lines.push(`- [ ] **Performance → Search type: Job listing**: clicks/impr from Google for Jobs`);
  lines.push(`- [ ] **Crawl stats**: requests trend, no spike in 4xx/5xx`);
  lines.push(`- [ ] Spot-check 3 random \`/jobs/{role}/{city}\` URLs in URL Inspection`);

  const summary = {
    auth: { source: auth.source, ok: !!auth.token, error: auth.error || null },
    window: { current: { start: iso(start), end: iso(end) }, previous: { start: iso(prevStart), end: iso(prevEnd) } },
    sections: {
      "1_headline": { clicks: totals.clicks, impressions: totals.impr, indexedPages, indexedJobs, prevClicks: prevTotals.clicks, prevImpressions: prevTotals.impr },
      "2_sitemaps": { live: sitemapsLive.length, gscRegistered: smGsc.length },
      "3_top_gainers": Math.min(pages.length, 10),
      "4_top_losers": Math.min(pages.length, 10),
      "5_hiring_keywords": hiringQ.length,
      "6_low_ctr_candidates": lowCtr.length,
      "7_manual_checklist": 8,
    },
    populated: {
      "1_headline": pages.length > 0 || prevPages.length > 0,
      "2_sitemaps": sitemapsLive.length > 0,
      "3_top_gainers": pages.length > 0,
      "4_top_losers": pages.length > 0,
      "5_hiring_keywords": hiringQ.length > 0,
      "6_low_ctr_candidates": true, // section renders even when empty
      "7_manual_checklist": true,
    },
    gscErrors: errors,
  };

  return { markdown: lines.join("\n"), summary };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const { markdown, summary } = await buildReport();
    if (url.searchParams.get("format") === "md") {
      return new Response(markdown, {
        headers: { ...corsHeaders, "Content-Type": "text/markdown; charset=utf-8" },
      });
    }
    return new Response(JSON.stringify({ summary, markdown }, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
