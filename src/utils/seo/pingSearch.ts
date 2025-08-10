import { SITE_BASE_URL } from '@/config/seo';

export async function pingSearchEngines(sitemapUrl: string) {
  const encoded = encodeURIComponent(sitemapUrl);
  try { await fetch(`https://www.google.com/ping?sitemap=${encoded}`); } catch {}
  try { await fetch(`https://www.bing.com/ping?sitemap=${encoded}`); } catch {}
}

export async function pingJobsSitemap() {
  const url = `${SITE_BASE_URL}/jobs-sitemap.xml`;
  await pingSearchEngines(url);
}
