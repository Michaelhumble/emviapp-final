export async function pingSearchEngines(sitemapUrl: string) {
  const encoded = encodeURIComponent(sitemapUrl);
  try { await fetch(`https://www.google.com/ping?sitemap=${encoded}`); } catch {}
  try { await fetch(`https://www.bing.com/ping?sitemap=${encoded}`); } catch {}
}
