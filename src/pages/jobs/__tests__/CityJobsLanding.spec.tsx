import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CityJobsLanding from '@/pages/jobs/CityJobsLanding';

vi.mock('@/hooks/useOptimizedJobsData', () => ({
  useOptimizedJobsData: () => ({
    jobs: [
      { id: 'job1', title: 'Nail Tech', location: 'Houston, TX' },
      { id: 'job2', title: 'Hair Stylist', location: 'Houston, TX' },
    ],
    loading: false,
    error: '',
    refresh: () => {}
  })
}));

vi.mock('@/hooks/useOptimizedArtistsData', () => ({
  useOptimizedArtistsData: () => ({
    artists: [
      { id: 'a1', user_id: 'a1', headline: 'Nail Artist', location: 'Houston, TX' }
    ],
    loading: false,
    error: ''
  })
}));

describe('CityJobsLanding SEO & structure', () => {
  it('renders H1, canonical, and JSON-LD blocks', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/jobs/in/houston-tx"]}>
          <Routes>
            <Route path="/jobs/in/:cityState" element={<CityJobsLanding />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // H1
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1!.textContent).toContain('Beauty jobs in Houston, TX');

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.href).toContain('https://www.emvi.app/jobs/in/houston-tx');

    // JSON-LD
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const types = scripts.map(s => {
      try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; }
    });
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('ItemList');
    expect(types).toContain('FAQPage');
  });
});
