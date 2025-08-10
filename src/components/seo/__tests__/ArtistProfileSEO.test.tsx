import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import ArtistProfileSEO from '@/components/seo/ArtistProfileSEO';

const wrapWithHelmet = (ui: React.ReactNode) => {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
};

describe('ArtistProfileSEO', () => {
  it('sets title, description, og tags, and canonical link', () => {
    const profile: any = {
      full_name: 'Jane Doe',
      specialty: 'Nail Artist',
      location: 'San Jose, CA',
      bio: 'Award-winning nail artist with 10+ years of experience.',
      avatar_url: 'https://example.com/avatar.jpg',
    };

    wrapWithHelmet(
      <ArtistProfileSEO profile={profile} portfolioImages={["https://example.com/portfolio1.jpg"]} />
    );

    // Title
    expect(document.title).toContain('Book Jane Doe – Nail Artist in San Jose, CA | EmviApp');

    // Description
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();

    // Open Graph
    const ogType = document.querySelector('meta[property="og:type"][content="profile"]');
    expect(ogType).not.toBeNull();
  });
});
