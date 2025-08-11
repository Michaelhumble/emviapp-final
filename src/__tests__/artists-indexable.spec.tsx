import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Artists from '@/pages/Artists';

function getJsonLdTypes() {
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map((s) => {
      try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; }
    })
    .filter(Boolean) as string[];
}

describe('/artists SEO', () => {
  it('renders canonical, indexable, ≥8 subpage links, and ItemList + BreadcrumbList JSON-LD', () => {
    const { container } = render(
      <HelmetProvider>
        <Artists />
      </HelmetProvider>
    );

    // Canonical to /artists
    const canonical = container.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical).not.toBeNull();
    expect(canonical!.href).toBe('https://www.emvi.app/artists');

    // No robots noindex
    const robots = container.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect(robots?.content || '').not.toMatch(/noindex/i);

    // At least 8 links to /artists/* subpages
    const links = Array.from(container.querySelectorAll('a[href^="/artists/"]')) as HTMLAnchorElement[];
    const subpageLinks = links.filter((a) => /\/artists\/(hair|nails|makeup|barber|skincare|brows-lashes|tattoo|massage)\//.test(a.getAttribute('href') || ''));
    expect(subpageLinks.length).toBeGreaterThanOrEqual(8);

    // JSON-LD types include ItemList and BreadcrumbList
    const types = getJsonLdTypes();
    expect(types).toContain('ItemList');
    expect(types).toContain('BreadcrumbList');
  });
});
