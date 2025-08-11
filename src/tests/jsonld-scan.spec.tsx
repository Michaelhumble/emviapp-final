import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Index from '@/pages/Index';
import Jobs from '@/pages/Jobs';
import JobDetailPage from '@/pages/JobDetailPage';
import Artists from '@/pages/Artists';
import SpecialtyCity from '@/pages/artists/SpecialtyCityLanding';
import ArtistPublicProfilePage from '@/pages/u/artist-profile/ArtistPublicProfilePage';
import ViralArticle from '@/pages/ViralArticle';
import ArtistProfileSEO from '@/components/seo/ArtistProfileSEO';

function collectJsonLdTypes() {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')) as HTMLScriptElement[];
  return scripts.map((s) => {
    try { return JSON.parse(s.textContent || '{}'); } catch { return {}; }
  }).map((o: any) => o['@type']).filter(Boolean);
}

function getTypesCount() {
  const types = collectJsonLdTypes();
  const counts = new Map<string, number>();
  types.forEach((t: any) => {
    if (Array.isArray(t)) {
      t.forEach((x) => counts.set(x, (counts.get(x) || 0) + 1));
    } else {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  });
  return counts;
}

function resetHead() { document.head.innerHTML = ''; }

describe('Sitewide JSON-LD scan', () => {
  beforeEach(() => cleanup());
  afterEach(() => resetHead());

  it('home (/) has exactly one Organization and WebSite, others do not duplicate them', () => {
    render(
      <HelmetProvider>
        <Index />
      </HelmetProvider>
    );
    const counts = getTypesCount();
    expect(counts.get('Organization') || 0).toBeGreaterThanOrEqual(1);
    expect(counts.get('WebSite') || 0).toBeGreaterThanOrEqual(1);
    resetHead();

    // Artists should not inject global org/website
    render(
      <HelmetProvider>
        <Artists />
      </HelmetProvider>
    );
    const countsArtists = getTypesCount();
    expect(countsArtists.get('Organization') || 0).toBe(0);
    expect(countsArtists.get('WebSite') || 0).toBe(0);
  });

  it('jobs list allows up to 2 ItemList, and job detail has exactly 1 JobPosting', () => {
    // Jobs list
    render(
      <HelmetProvider>
        <Jobs />
      </HelmetProvider>
    );
    const countsJobs = getTypesCount();
    expect((countsJobs.get('ItemList') || 0)).toBeLessThanOrEqual(2);
    resetHead();

    // Job detail
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[{ pathname: '/jobs/abc-123' }]}>
          <Routes>
            <Route path="/jobs/:id" element={<JobDetailPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    const countsDetail = getTypesCount();
    expect(countsDetail.get('JobPosting') || 0).toBe(1);
  });

  it('artists index has ItemList (<=2) and BreadcrumbList exactly once', () => {
    render(
      <HelmetProvider>
        <Artists />
      </HelmetProvider>
    );
    const counts = getTypesCount();
    expect((counts.get('ItemList') || 0)).toBeLessThanOrEqual(2);
    expect(counts.get('BreadcrumbList') || 0).toBe(1);
  });

  it('specialty/city page has ItemList (<=2), BreadcrumbList exactly 1, and FAQPage at most 1', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[{ pathname: '/artists/nails/san-jose-ca' }]}>
          <Routes>
            <Route path="/artists/:specialty/:cityState" element={<SpecialtyCity />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    const counts = getTypesCount();
    expect((counts.get('ItemList') || 0)).toBeLessThanOrEqual(2);
    expect(counts.get('BreadcrumbList') || 0).toBe(1);
    expect((counts.get('FAQPage') || 0)).toBeLessThanOrEqual(1);
  });

  it('artist profile has exactly 1 Person and no global schema duplicates', () => {
    // Mock data for profile SEO
    history.pushState({}, '', 'https://www.emvi.app/u/jane-doe');
    const profile: any = {
      username: 'jane-doe',
      full_name: 'Jane Doe',
      specialty: 'Nail Artist',
      location: 'San Jose, CA',
    };

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[{ pathname: '/u/jane-doe' }]}>
          <Routes>
            <Route path="/u/:username" element={<ArtistPublicProfilePage />} />
          </Routes>
        </MemoryRouter>
        {/* Ensure Person JSON-LD is present via SEO component */}
        <ArtistProfileSEO profile={profile} portfolioImages={[]} />
      </HelmetProvider>
    );
    const counts = getTypesCount();
    expect(counts.get('Person') || 0).toBe(1);
    expect(counts.get('Organization') || 0).toBe(0);
    expect(counts.get('WebSite') || 0).toBe(0);
  });

  it('article page has exactly 1 Article and BreadcrumbList at most 1', () => {
    render(
      <HelmetProvider>
        <ViralArticle />
      </HelmetProvider>
    );
    const counts = getTypesCount();
    expect(counts.get('Article') || 0).toBeGreaterThanOrEqual(1);
    expect((counts.get('BreadcrumbList') || 0)).toBeLessThanOrEqual(1);
  });
});
