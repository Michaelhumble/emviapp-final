import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RoleCityJobsLanding from '@/pages/jobs/RoleCityJobsLanding';

vi.mock('@/hooks/useOptimizedJobsData', () => ({
  useOptimizedJobsData: () => ({
    jobs: [
      { id: 'job1', title: 'Nail Tech', location: 'Houston, TX', category: 'nails' },
      { id: 'job2', title: 'Hair Stylist', location: 'Houston, TX', category: 'hair' },
    ],
    loading: false,
    error: '',
  })
}));

describe('RoleCityJobsLanding SEO & structure', () => {
  it('renders H1, canonical, and JSON-LD blocks', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/jobs/nails/houston-tx"]}>
          <Routes>
            <Route path="/jobs/:role/:cityState" element={<RoleCityJobsLanding />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1!.textContent).toContain('Nails jobs in Houston, TX');

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.href).toContain('https://www.emvi.app/jobs/nails/houston-tx');

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const types = scripts.map(s => { try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; } });
    expect(types).toContain('BreadcrumbList');
    expect(types).toContain('ItemList');
    expect(types).toContain('FAQPage');
  });
});
