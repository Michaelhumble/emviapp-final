import { describe, it, expect } from 'vitest';

const URL = 'https://www.emvi.app/blog-sitemap.xml';

describe('Blog sitemap endpoint (live)', () => {
  it('GET returns 200 XML and valid root element', async () => {
    const res = await fetch(URL, { method: 'GET' });
    expect(res.status).toBe(200);
    const ct = res.headers.get('content-type') || '';
    expect(ct.toLowerCase()).toContain('application/xml');
    const text = await res.text();
    expect(text.startsWith('<?xml')).toBe(true);
    expect(/<(urlset|sitemapindex)[^>]*>/.test(text)).toBe(true);
  }, 20000);

  it('HEAD returns 200 with XML Content-Type', async () => {
    const res = await fetch(URL, { method: 'HEAD' });
    expect(res.status).toBe(200);
    const ct = res.headers.get('content-type') || '';
    expect(ct.toLowerCase()).toContain('application/xml');
  }, 20000);
});
