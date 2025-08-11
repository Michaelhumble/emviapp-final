import { describe, expect, it } from 'vitest';
import fs from 'fs';

const ROBOTS_PATH = 'public/robots.txt';
const SITEMAP_INDEX_PATH = 'public/sitemap.xml';
const VERCEL_JSON_PATH = 'vercel.json';

function read(path: string) { return fs.readFileSync(path, 'utf-8'); }

describe('Sitemaps & Robots (presence checks)', () => {
  it('robots.txt includes the two www sitemap lines', () => {
    const robots = read(ROBOTS_PATH);
    expect(robots).toContain('Sitemap: https://www.emvi.app/sitemap.xml');
    expect(robots).toContain('Sitemap: https://www.emvi.app/jobs-sitemap.xml');
  });

  it('sitemap.xml includes static and jobs sitemap (www)', () => {
    const xml = read(SITEMAP_INDEX_PATH);
    expect(xml).toContain('<loc>https://www.emvi.app/sitemap-static.xml</loc>');
    expect(xml).toContain('<loc>https://www.emvi.app/jobs-sitemap.xml</loc>');
  });
});

describe('Host canonicalization (Vercel)', () => {
  it('vercel.json has redirect emvi.app -> www.emvi.app as first rule', () => {
    const cfg = JSON.parse(read(VERCEL_JSON_PATH));
    const redirects = cfg.redirects || [];
    expect(redirects[0]?.destination).toBe('https://www.emvi.app/$1');
    expect(Array.isArray(redirects[0]?.has)).toBe(true);
  });
});
