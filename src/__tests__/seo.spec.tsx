import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseSEO from '@/components/seo/BaseSEO';
import JobSEO from '@/components/seo/JobSEO';

describe('BaseSEO', () => {
  it('renders canonical, og tags, hreflangs and JSON-LD', () => {
    const { container } = render(
      <BaseSEO
        title="Test Page | EmviApp"
        description="Test Description"
        canonical="/test"
        ogImage="/test.jpg"
        hreflangs={[
          { hrefLang: 'en', href: '/test' },
          { hrefLang: 'vi', href: '/vi/test' },
          { hrefLang: 'x-default', href: '/test' },
        ]}
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'EmviApp' }]}
      />
    );
    expect(container.querySelector('link[rel="canonical"][href="https://www.emvi.app/test"]')).toBeInTheDocument();
    expect(container.querySelector('meta[property="og:url"][content="https://www.emvi.app/test"]')).toBeInTheDocument();
    expect(container.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    expect(container.querySelector('link[rel="alternate"][hreflang="vi"][href="https://www.emvi.app/vi/test"]')).toBeInTheDocument();
  });
});

describe('BaseSEO JSON-LD count', () => {
  it('renders one script per JSON-LD object', () => {
    const { container } = render(
      <BaseSEO
        title="Count Test | EmviApp"
        description="Json-LD count test"
        canonical="/count-test"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'WebSite', name: 'EmviApp' },
          { '@context': 'https://schema.org', '@type': 'Organization', name: 'EmviApp' },
        ]}
      />
    );
    expect(container.querySelectorAll('script[type="application/ld+json"]').length).toBe(2);
  });
});

describe('JobSEO meta', () => {
  it('includes canonical and og tags via DynamicSEO', () => {
    const job: any = { id: 'id1', title: 'Nail Tech', location: 'San Jose, CA, US', category: 'nails', description: 'Provide services', created_at: new Date().toISOString() };
    const { container } = render(<JobSEO job={job} baseUrl="https://www.emvi.app" />);
    const canonical = container.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical?.getAttribute('href')).toMatch(/^https:\/\/www\.emvi\.app\//);
    expect(container.querySelector('meta[property="og:title"]')).toBeInTheDocument();
  });
});
