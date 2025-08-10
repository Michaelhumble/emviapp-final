import { describe, it, expect } from 'vitest';
import fs from 'fs';

describe('Locations sitemap', () => {
  it('exists and includes sample URLs', () => {
    const xml = fs.readFileSync('public/locations-sitemap.xml', 'utf-8');
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('https://www.emvi.app/jobs/in/houston-tx');
    expect(xml).toContain('https://www.emvi.app/jobs/nails/houston-tx');
    expect(xml).toContain('https://www.emvi.app/artists/nails/houston-tx');
  });
});
