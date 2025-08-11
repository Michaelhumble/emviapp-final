import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SignIn from '@/pages/auth/SignIn';

describe('/signin SEO', () => {
  it('has canonical to www and robots noindex', () => {
    const { container } = render(
      <HelmetProvider>
        <SignIn />
      </HelmetProvider>
    );
    const canonical = container.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical?.href).toBe('https://www.emvi.app/signin');
    const robots = container.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    expect(robots?.content).toMatch(/noindex/);
  });
});
