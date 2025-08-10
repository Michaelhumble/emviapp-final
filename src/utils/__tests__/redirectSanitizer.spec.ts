import { describe, expect, it } from 'vitest';
import { sanitizeRedirect } from '@/utils/redirectSanitizer';

describe('redirectSanitizer', () => {
  it('defaults to /jobs when missing', () => {
    expect(sanitizeRedirect(undefined)).toBe('/jobs');
    expect(sanitizeRedirect(null as unknown as string)).toBe('/jobs');
    expect(sanitizeRedirect('')).toBe('/jobs');
  });

  it('allows only whitelisted prefixes and strips nested redirect params', () => {
    expect(sanitizeRedirect('/jobs')).toBe('/jobs');
    expect(sanitizeRedirect('/jobs?redirect=/evil')).toBe('/jobs');
    expect(sanitizeRedirect('/artists')).toBe('/artists');
    expect(sanitizeRedirect('/artists/nails/houston-tx')).toBe('/artists/nails/houston-tx');
    expect(sanitizeRedirect('/unknown')).toBe('/jobs');
  });

  it('guards against loops to sign-in pages', () => {
    expect(sanitizeRedirect('/signin')).toBe('/jobs');
    expect(sanitizeRedirect('/auth/signin')).toBe('/jobs');
    expect(sanitizeRedirect('/sign-in')).toBe('/jobs');
  });

  it('rejects external domains', () => {
    expect(sanitizeRedirect('https://evil.com/hack')).toBe('/jobs');
    expect(sanitizeRedirect('https://www.emvi.app/jobs')).toBe('/jobs');
    expect(sanitizeRedirect('https://www.emvi.app/artists/nails')).toBe('/artists/nails');
  });

  it('caps length to ~200 chars', () => {
    const long = '/jobs?' + 'a'.repeat(300);
    const out = sanitizeRedirect(long);
    expect(out.startsWith('/jobs')).toBe(true);
    expect(out.length).toBeLessThanOrEqual(200);
  });
});
