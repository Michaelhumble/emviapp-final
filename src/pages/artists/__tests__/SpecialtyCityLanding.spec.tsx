import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SpecialtyCityLanding from '@/pages/artists/SpecialtyCityLanding';

vi.mock('@/hooks/useArtistsSearch', () => ({
  useArtistsSearch: () => ({
    items: [
      { id: 'a1', user_id: 'a1', headline: 'Nail Artist', specialties: 'nails', location: 'Houston, TX' },
    ],
    loading: false,
    hasMore: false,
    loadMore: () => {},
    filters: { q: '', location: '', specialty: '', available: true, vietnamese: false, sort: '' },
    setFilters: () => {},
    specialtyChips: [],
    featured: []
  })
}));

describe('SpecialtyCityLanding SEO & structure', () => {
  it('renders H1, canonical, and single JSON-LD scripts (ItemList/FAQ/Breadcrumb)', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/artists/nails/houston-tx"]}>
          <Routes>
            <Route path="/artists/:specialty/:cityState" element={<SpecialtyCityLanding />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1!.textContent).toContain('Hire Nails in Houston, TX');

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.href).toContain('https://www.emvi.app/artists/nails/houston-tx');

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const types = scripts.map(s => { try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; } });
    const typeCounts = types.reduce((acc: Record<string, number>, t: any) => { if (!t) return acc; acc[t] = (acc[t] || 0) + 1; return acc; }, {} as any);
    expect(typeCounts['BreadcrumbList']).toBe(1);
    expect(typeCounts['ItemList']).toBe(1);
    expect(typeCounts['FAQPage']).toBe(1);
  });
});
