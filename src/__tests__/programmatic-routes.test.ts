// Test file to verify programmatic routes
import { describe, it, expect } from 'vitest';
import { SEO_ROLES } from '@/data/seo-roles';
import { SEO_LOCATIONS } from '@/data/seo-locations';
import { generateAllArtistRoutes, getRouteCount, SAMPLE_ROUTES } from '@/utils/seo/programmaticRoutes';

describe('Programmatic Artist Routes', () => {
  it('should have exactly 6 roles', () => {
    expect(SEO_ROLES).toHaveLength(6);
    expect(SEO_ROLES.map(r => r.id)).toEqual(['nails', 'hair', 'barber', 'lashes', 'massage', 'skincare']);
  });

  it('should have exactly 25 locations', () => {
    expect(SEO_LOCATIONS).toHaveLength(25);
  });

  it('should generate exactly 150 routes (25 cities × 6 roles)', () => {
    const routes = generateAllArtistRoutes();
    expect(routes).toHaveLength(150);
    expect(getRouteCount()).toBe(150);
  });

  it('should generate correct URL patterns', () => {
    const routes = generateAllArtistRoutes();
    
    // Check first route
    expect(routes[0]).toEqual({
      role: 'nails',
      cityState: 'houston-tx',
      url: '/artists/nails/houston-tx',
      title: 'Top Nail Artists in Houston, TX – EmviApp'
    });

    // Verify all routes follow correct pattern
    routes.forEach(route => {
      expect(route.url).toMatch(/^\/artists\/[a-z]+\/[a-z\-]+$/);
      expect(route.title).toContain('EmviApp');
      expect(route.title).toContain(' in ');
    });
  });

  it('should have valid sample routes', () => {
    expect(SAMPLE_ROUTES).toEqual([
      '/artists/nails/houston-tx',
      '/artists/hair/los-angeles-ca',
      '/artists/barber/chicago-il'
    ]);
  });

  it('should cover all role×city combinations', () => {
    const routes = generateAllArtistRoutes();
    const urlSet = new Set(routes.map(r => r.url));
    
    // Test specific combinations exist
    expect(urlSet.has('/artists/nails/houston-tx')).toBe(true);
    expect(urlSet.has('/artists/hair/los-angeles-ca')).toBe(true);
    expect(urlSet.has('/artists/skincare/new-york-ny')).toBe(true);
    expect(urlSet.has('/artists/massage/miami-fl')).toBe(true);
    
    // All URLs should be unique
    expect(urlSet.size).toBe(150);
  });
});