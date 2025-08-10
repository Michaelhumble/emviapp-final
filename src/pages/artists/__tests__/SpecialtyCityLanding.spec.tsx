import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SpecialtyCityLanding from '@/pages/artists/SpecialtyCityLanding';

vi.mock('@/hooks/useArtistsSearch', () => ({
  useArtistsSearch: () => ({
    items: [
      { id: 'a1', user_id: 'a1', full_name: 'Pro Nail Artist', headline: 'Nail Artist', location: 'Houston, TX', specialties: 'nails' },
    ]
  })
}));

describe('SpecialtyCityLanding SEO & structure', () => {
  it('renders H1, canonical, and JSON-LD blocks', () => {
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
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('ItemList');
    expect(types).toContain('FAQPage');
  });
});
