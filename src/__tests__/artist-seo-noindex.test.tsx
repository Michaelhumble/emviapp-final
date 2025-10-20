import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import '@testing-library/jest-dom';
import ArtistProfileSEO from '@/components/seo/ArtistProfileSEO';
import { UserProfile } from '@/types/profile';

const createMockProfile = (overrides: Partial<UserProfile> = {}): UserProfile => ({
  id: 'test-artist-123',
  full_name: 'Jane Artist',
  specialty: 'Nail Technician',
  location: 'Los Angeles, CA',
  bio: 'Professional nail artist with 5 years experience',
  avatar_url: 'https://example.com/avatar.jpg',
  ...overrides
});

describe('Artist Profile SEO - Noindex Behavior', () => {
  describe('Available Artists', () => {
    it('does NOT add noindex meta tag for available artists', () => {
      const profile = createMockProfile({
        available_for_hire: true
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      // Check that noindex meta tag is NOT present
      const metaTags = container.querySelectorAll('meta[name="robots"]');
      const noindexTag = Array.from(metaTags).find(
        tag => (tag as HTMLMetaElement).getAttribute('content')?.includes('noindex')
      );
      expect(noindexTag).toBeUndefined();
    });

    it('does NOT add noindex when available_for_hire is null', () => {
      const profile = createMockProfile({
        available_for_hire: null as any
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const metaTags = container.querySelectorAll('meta[name="robots"]');
      const noindexTag = Array.from(metaTags).find(
        tag => (tag as HTMLMetaElement).getAttribute('content')?.includes('noindex')
      );
      expect(noindexTag).toBeUndefined();
    });
  });

  describe('Hidden/Unavailable Artists', () => {
    it('adds noindex meta tag when available_for_hire is false', () => {
      const profile = createMockProfile({
        available_for_hire: false
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const metaTags = container.querySelectorAll('meta[name="robots"]');
      const noindexTag = Array.from(metaTags).find(
        tag => (tag as HTMLMetaElement).getAttribute('content') === 'noindex, follow'
      );
      expect(noindexTag).toBeDefined();
    });

    it('adds noindex meta tag when is_hidden is true', () => {
      const profile = createMockProfile({
        is_hidden: true
      } as any);

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const metaTags = container.querySelectorAll('meta[name="robots"]');
      const noindexTag = Array.from(metaTags).find(
        tag => (tag as HTMLMetaElement).getAttribute('content') === 'noindex, follow'
      );
      expect(noindexTag).toBeDefined();
    });

    it('adds noindex when both available_for_hire=false and is_hidden=true', () => {
      const profile = createMockProfile({
        available_for_hire: false,
        is_hidden: true
      } as any);

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const metaTags = container.querySelectorAll('meta[name="robots"]');
      const noindexTag = Array.from(metaTags).find(
        tag => (tag as HTMLMetaElement).getAttribute('content') === 'noindex, follow'
      );
      expect(noindexTag).toBeDefined();
    });
  });

  describe('SEO Meta Tags Still Present', () => {
    it('includes title and description even for hidden profiles', () => {
      const profile = createMockProfile({
        available_for_hire: false
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      // Title should still be present
      const titleTag = container.querySelector('title');
      expect(titleTag?.textContent).toContain('Jane Artist');

      // Description should still be present
      const descriptionTag = container.querySelector('meta[name="description"]');
      expect(descriptionTag?.getAttribute('content')).toBeTruthy();
    });

    it('includes canonical URL even for hidden profiles', () => {
      const profile = createMockProfile({
        available_for_hire: false
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const canonicalTag = container.querySelector('link[rel="canonical"]');
      expect(canonicalTag).toBeDefined();
    });

    it('includes OpenGraph tags even for hidden profiles', () => {
      const profile = createMockProfile({
        available_for_hire: false
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const ogTitle = container.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute('content')).toContain('Jane Artist');
    });
  });

  describe('Structured Data', () => {
    it('includes Person schema even for hidden profiles', () => {
      const profile = createMockProfile({
        available_for_hire: false
      });

      const { container } = render(
        <HelmetProvider>
          <ArtistProfileSEO profile={profile} portfolioImages={[]} />
        </HelmetProvider>
      );

      const scriptTag = container.querySelector('script[type="application/ld+json"]');
      expect(scriptTag).toBeDefined();
      
      const jsonLd = JSON.parse(scriptTag!.textContent || '{}');
      expect(jsonLd['@type']).toBe('Person');
      expect(jsonLd.name).toBe('Jane Artist');
    });
  });
});
