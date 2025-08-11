import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ArtistProfileSEO from '@/components/seo/ArtistProfileSEO';
import ArtistPublicProfilePage from '@/pages/u/artist-profile/ArtistPublicProfilePage';
import ArtistProfile from '@/components/artist-profile/ArtistProfile';

function getJsonLdObjects() {
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')) as HTMLScriptElement[];
  return scripts.map((s) => {
    try { return JSON.parse(s.textContent || '{}'); } catch { return {}; }
  });
}

function getCanonicalHref(container: HTMLElement) {
  const link = container.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  return link?.href || '';
}

describe('ArtistProfileSEO (available vs unavailable)', () => {
  beforeEach(() => cleanup());
  afterEach(() => {
    // Clear head between tests
    document.head.innerHTML = '';
  });

  it('available profile: canonical to /u/{username}, no noindex, 1 Person JSON-LD with expected fields, and similar artists links ≥ 3', () => {
    // Set URL for canonical
    history.pushState({}, '', 'https://www.emvi.app/u/jane-doe');

    const profile: any = {
      username: 'jane-doe',
      full_name: 'Jane Doe',
      specialty: 'Nail Artist',
      location: 'San Jose, CA',
      bio: 'Award-winning nail artist with 10+ years of experience.',
      avatar_url: 'https://example.com/avatar.jpg',
      website: 'https://janedoe.example.com'
    };

    const { container } = render(
      <HelmetProvider>
        <div>
          <ArtistProfileSEO profile={profile} portfolioImages={["https://example.com/portfolio1.jpg"]} />
          {/* Render profile body to expose Similar artists nav */}
          <ArtistProfile profile={profile} services={[]} portfolioImages={[]} />
        </div>
      </HelmetProvider>
    );

    // Canonical
    expect(getCanonicalHref(container)).toBe('https://www.emvi.app/u/jane-doe');

    // Robots: ensure no noindex
    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect((robots?.content || '').toLowerCase()).not.toContain('noindex');

    // JSON-LD: exactly one Person
    const jsonld = getJsonLdObjects();
    const persons = jsonld.filter((o: any) => o['@type'] === 'Person');
    expect(persons.length).toBe(1);
    const person = persons[0] as any;
    expect(person.name).toBe('Jane Doe');
    expect(person.jobTitle).toBe('Nail Artist');
    expect(person.url).toBe('https://www.emvi.app/u/jane-doe');
    // address or areaServed present
    expect(Boolean(person.address) || Boolean(person.areaServed)).toBe(true);
    // knowsAbout when specialty exists
    expect(Array.isArray(person.knowsAbout) && person.knowsAbout.includes('Nail Artist')).toBe(true);
    // sameAs optional (website included in component)
    if (person.sameAs) {
      expect(Array.isArray(person.sameAs)).toBe(true);
    }

    // Similar artists links (absolute to /artists/*)
    const links = Array.from(document.querySelectorAll('nav[aria-label="Similar artists"] a')) as HTMLAnchorElement[];
    const internal = links.filter((a) => a.href.startsWith('https://www.emvi.app/artists/'));
    expect(internal.length).toBeGreaterThanOrEqual(3);
  });

  it('unavailable profile: robots noindex present, banner visible, similar artists section still renders', async () => {
    vi.mock('@/pages/u/artist-profile/hooks/useArtistProfileData', () => ({
      useArtistProfileData: () => ({
        profile: null,
        services: [],
        portfolioImages: [],
        loading: false,
        error: 'Not currently available',
        viewCount: 0,
        incrementViewCount: vi.fn(),
      }),
    }));

    const { container, findByText } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[{ pathname: '/u/jane-doe' }]}>
          <Routes>
            <Route path="/u/:username" element={<ArtistPublicProfilePage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // robots noindex
    const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect(robots).toBeTruthy();
    expect((robots!.content || '').toLowerCase()).toContain('noindex');

    // banner text (accept either phrasing)
    const banner = await findByText(/artist not found|not currently available/i);
    expect(banner).toBeTruthy();

    // similar artists section present with ≥3 links
    const links = Array.from(container.querySelectorAll('nav[aria-label="Similar artists"] a')) as HTMLAnchorElement[];
    expect(links.length).toBeGreaterThanOrEqual(3);
  });
});
