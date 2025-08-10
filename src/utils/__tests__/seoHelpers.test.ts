import { describe, it, expect } from 'vitest';
import { generateSEOSlug, generateMetaDescription } from '@/utils/seoHelpers';

describe('seoHelpers', () => {
  it('generateSEOSlug creates clean slugs with title, location, and id', () => {
    const slug = generateSEOSlug('Senior Nail Artist', 'San Jose, CA', '123');
    expect(slug).toBe('senior-nail-artist-san-jose-ca-123');
  });

  it('generateSEOSlug handles missing location and id', () => {
    const slug = generateSEOSlug('Makeup & Beauty Pro');
    expect(slug).toBe('makeup-beauty-pro');
  });

  it('generateMetaDescription truncates to max length and keeps words intact', () => {
    const longText = 'A'.repeat(500);
    const desc = generateMetaDescription(longText, 160);
    expect(desc.length).toBeLessThanOrEqual(163); // includes potential ellipsis
    expect(desc.endsWith('...')).toBe(true);
  });
});
