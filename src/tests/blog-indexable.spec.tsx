import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import BlogLanding from '@/pages/blog/BlogLanding';

function getJsonLdTypes() {
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map((s) => { try { return JSON.parse(s.textContent || '{}')['@type']; } catch { return undefined; } })
    .filter(Boolean) as string[];
}

describe('/blog SEO', () => {
  it('has canonical to /blog, indexable, ≥6 article links, and ItemList JSON-LD', () => {
    const { container } = render(
      <HelmetProvider>
        <BlogLanding />
      </HelmetProvider>
    );

    const canonical = container.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical?.href).toBe('https://www.emvi.app/blog');

    const robots = container.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect((robots?.content || '').toLowerCase()).not.toContain('noindex');

    const links = Array.from(container.querySelectorAll('a[href^="/blog/"]')) as HTMLAnchorElement[];
    expect(links.length).toBeGreaterThanOrEqual(6);

    const types = getJsonLdTypes();
    expect(types).toContain('ItemList');
  });
});
