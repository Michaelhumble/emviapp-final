import { describe, it, expect } from 'vitest';
import { sanitizeRedirect } from '@/utils/redirectSanitizer';

describe('redirectSanitizer', () => {
  it('blocks loops to signin and external hosts, strips nested params, and allows only safe paths', () => {
    expect(sanitizeRedirect('/signin')).toBe('/jobs');
    expect(sanitizeRedirect('/auth/signin?redirect=/jobs')).toBe('/jobs');
    expect(sanitizeRedirect('https://evil.com/hack')).toBe('/jobs');
    expect(sanitizeRedirect('https://emvi.app/jobs?redirect=/signin')).toBe('/jobs');
    expect(sanitizeRedirect('/artists/hair/los-angeles-ca')).toBe('/artists/hair/los-angeles-ca');
  });
});
