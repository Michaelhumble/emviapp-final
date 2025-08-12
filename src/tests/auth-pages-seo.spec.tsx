import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';

function getMeta(name: string) {
  return document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
}

function getCanonical() {
  return document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
}

describe('Auth pages SEO', () => {
  it('/signin is noindex,nofollow with canonical', () => {
    const { container } = render(
      <HelmetProvider>
        <SignIn />
      </HelmetProvider>
    );
    const robots = getMeta('robots');
    expect(robots?.content).toMatch(/noindex/i);
    expect(robots?.content).toMatch(/nofollow/i);
    const canonical = getCanonical();
    expect(canonical?.href).toBe('https://www.emvi.app/signin');
  });

  it('/signup is noindex,nofollow with canonical', () => {
    const { container } = render(
      <HelmetProvider>
        <SignUp />
      </HelmetProvider>
    );
    const robots = getMeta('robots');
    expect(robots?.content).toMatch(/noindex/i);
    expect(robots?.content).toMatch(/nofollow/i);
    const canonical = getCanonical();
    expect(canonical?.href).toBe('https://www.emvi.app/signup');
  });
});
