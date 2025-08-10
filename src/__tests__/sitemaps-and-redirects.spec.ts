import { describe, expect, it } from 'vitest';
import fs from 'fs';

const ROBOTS_PATH = 'public/robots.txt';
const SITEMAP_INDEX_PATH = 'public/sitemap.xml';
const VERCEL_JSON_PATH = 'vercel.json';

function read(path: string) { return fs.readFileSync(path, 'utf-8'); }

describe('Sitemaps & Robots', () => {
  it('robots.txt lists only www sitemaps', () => {
    const robots = read(ROBOTS_PATH);
    expect(robots).toContain('Sitemap: https://www.emvi.app/sitemap.xml');
    expect(robots).toContain('Sitemap: https://www.emvi.app/jobs-sitemap.xml');
    expect(robots).not.toMatch(/functions\.supabase\.co\/jobs-sitemap/);
  });

  it('sitemap.xml includes static and jobs sitemap', () => {
    const xml = read(SITEMAP_INDEX_PATH);
    expect(xml).toContain('<loc>https://www.emvi.app/sitemap-static.xml</loc>');
    expect(xml).toContain('<loc>https://www.emvi.app/jobs-sitemap.xml</loc>');
  });
});

describe('Host canonicalization (Vercel)', () => {
  it('vercel.json has redirect emvi.app -> www.emvi.app', () => {
    const cfg = JSON.parse(read(VERCEL_JSON_PATH));
    const redirects = cfg.redirects || [];
    const hasRule = redirects.some((r: any) => r.destination === 'https://www.emvi.app/$1' && r.permanent && Array.isArray(r.has) && r.has.some((h: any) => h.type === 'host' && h.value === 'emvi.app'));
    expect(hasRule).toBe(true);
  });

  it('vercel.json includes jobs-sitemap rewrites + headers', () => {
    const cfg = JSON.parse(read(VERCEL_JSON_PATH));
    const rewrites = cfg.rewrites || [];
    const headers = cfg.headers || [];
    const hasRewrite = rewrites.some((r: any) => r.source === '/jobs-sitemap.xml');
    const hasHeaders = headers.some((h: any) => h.source === '/jobs-sitemap.xml' && h.headers?.some((x: any) => x.key === 'Content-Type'));
    expect(hasRewrite).toBe(true);
    expect(hasHeaders).toBe(true);
  });
});
