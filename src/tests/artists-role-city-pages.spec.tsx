import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import fs from 'fs';

import SpecialtyCityLanding from '@/pages/artists/SpecialtyCityLanding';

const roles = ['nails','hair','barber','makeup','massage','tattoo'] as const;
const cities = [
  'new-york-ny','los-angeles-ca','chicago-il','houston-tx','phoenix-az',
  'philadelphia-pa','san-antonio-tx','san-diego-ca','dallas-tx','san-jose-ca',
  'austin-tx','jacksonville-fl','fort-worth-tx','columbus-oh','charlotte-nc',
  'san-francisco-ca','indianapolis-in','seattle-wa','denver-co','washington-dc',
  'boston-ma','nashville-tn','el-paso-tx','detroit-mi','portland-or'
] as const;

// Ensure at least 4 crawlable links by mocking search to return 4+ items consistently
vi.mock('@/hooks/useArtistsSearch', () => ({
  useArtistsSearch: () => ({
    items: [
      { id: 'a1', user_id: 'a1', headline: 'Pro 1', specialties: 'nails', location: 'Anywhere, US' },
      { id: 'a2', user_id: 'a2', headline: 'Pro 2', specialties: 'hair', location: 'Anywhere, US' },
      { id: 'a3', user_id: 'a3', headline: 'Pro 3', specialties: 'barber', location: 'Anywhere, US' },
      { id: 'a4', user_id: 'a4', headline: 'Pro 4', specialties: 'makeup', location: 'Anywhere, US' },
    ],
    loading: false,
  })
}));

describe('Programmatic artist landing pages', () => {
  it('Each /artists/{role}/{cityState} is indexable, correct canonical, and has JSON-LD + ≥4 links', () => {
    roles.forEach((role) => {
      cities.forEach((city) => {
        const path = `/artists/${role}/${city}`;
        render(
          <HelmetProvider>
            <MemoryRouter initialEntries={[path]}>
              <Routes>
                <Route path="/artists/:specialty/:cityState" element={<SpecialtyCityLanding />} />
              </Routes>
            </MemoryRouter>
          </HelmetProvider>
        );

        // Canonical
        const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        expect(canonical).not.toBeNull();
        expect(canonical!.href).toBe(`https://www.emvi.app${path}`);

        // Robots: ensure indexable (no noindex)
        const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        expect((robots?.content || '').toLowerCase()).not.toContain('noindex');

        // JSON-LD types
        const types = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
          .map((s) => { try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; } });
        expect(types).toContain('ItemList');
        expect(types).toContain('FAQPage');
        expect(types).toContain('BreadcrumbList');

        // ≥4 internal links to /artists/*
        const links = Array.from(document.querySelectorAll('a[href^="/artists/"]')) as HTMLAnchorElement[];
        expect(links.length).toBeGreaterThanOrEqual(4);

        // Reset head for next iteration
        document.head.innerHTML = '';
      });
    });
  });

  it('Sitemap static file includes all 25×6 URLs', () => {
    const xml = fs.readFileSync('public/sitemap-static.xml', 'utf-8');
    const missing: string[] = [];
    roles.forEach((role) => {
      cities.forEach((city) => {
        const url = `https://www.emvi.app/artists/${role}/${city}`;
        if (!xml.includes(`<loc>${url}</loc>`)) missing.push(url);
      });
    });
    expect(missing).toEqual([]);
  });
});
