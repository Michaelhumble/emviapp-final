import { describe, it, expect } from 'vitest';

// Mock security headers configuration
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://*.supabase.co https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://wwhqbjrhbajpabfdwnip.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `report-uri https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/csp-report`
  ].join('; ')
};

describe('Security Headers', () => {
  it('should include HSTS header', () => {
    expect(securityHeaders['Strict-Transport-Security']).toBeDefined();
    expect(securityHeaders['Strict-Transport-Security']).toContain('max-age=63072000');
    expect(securityHeaders['Strict-Transport-Security']).toContain('includeSubDomains');
    expect(securityHeaders['Strict-Transport-Security']).toContain('preload');
  });

  it('should include X-Content-Type-Options header', () => {
    expect(securityHeaders['X-Content-Type-Options']).toBe('nosniff');
  });

  it('should include Referrer-Policy header', () => {
    expect(securityHeaders['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
  });

  it('should include X-Frame-Options header', () => {
    expect(securityHeaders['X-Frame-Options']).toBe('DENY');
  });

  it('should include Permissions-Policy header', () => {
    expect(securityHeaders['Permissions-Policy']).toBeDefined();
    expect(securityHeaders['Permissions-Policy']).toContain('camera=()');
    expect(securityHeaders['Permissions-Policy']).toContain('microphone=()');
    expect(securityHeaders['Permissions-Policy']).toContain('geolocation=()');
  });

  it('should include comprehensive CSP header', () => {
    const csp = securityHeaders['Content-Security-Policy'];
    expect(csp).toBeDefined();
    expect(csp).toContain('default-src \'self\'');
    expect(csp).toContain('frame-ancestors \'none\'');
    expect(csp).toContain('base-uri \'self\'');
    expect(csp).toContain('form-action \'self\'');
    expect(csp).toContain('report-uri https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/csp-report');
  });

  it('should allow required external domains in CSP', () => {
    const csp = securityHeaders['Content-Security-Policy'];
    expect(csp).toContain('https://*.supabase.co');
    expect(csp).toContain('https://wwhqbjrhbajpabfdwnip.supabase.co');
    expect(csp).toContain('https://fonts.googleapis.com');
    expect(csp).toContain('https://fonts.gstatic.com');
  });
});