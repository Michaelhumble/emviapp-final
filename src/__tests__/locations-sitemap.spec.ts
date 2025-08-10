import { describe, it, expect } from 'vitest';
import fs from 'fs';

describe('Locations sitemap', () => {
  it('exists and includes at least one city URL', () => {
    const xml = fs.readFileSync('public/locations-sitemap.xml', 'utf-8');
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('https://www.emvi.app/jobs');
    expect(xml).toMatch(/<urlset[\s\S]*<url>[\s\S]*<loc>https:\/\/www\.emvi\.app\/(jobs|artists)\//);
  });
});
