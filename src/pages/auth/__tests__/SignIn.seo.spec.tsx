import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/components/auth/SignInForm', () => ({ default: () => <div data-testid="form" /> }));
vi.mock('@/components/ui/Logo', () => ({ default: () => <div data-testid="logo" /> }));
vi.mock('@/components/ui/separator', () => ({ Separator: (props: any) => <div data-testid="sep" {...props} /> }));
vi.mock('@/components/auth/SocialAuthButtons', () => ({ SocialAuthButtons: (props: any) => <div data-testid="social" {...props} /> }));
vi.mock('@/components/auth/PhoneOtpDialog', () => ({ PhoneOtpDialog: (props: any) => <div data-testid="otp" {...props} /> }));

import SignIn from '../SignIn';

describe('SignIn SEO', () => {
  beforeEach(() => cleanup());

  it('sets canonical and noindex,nofollow', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[{ pathname: '/signin' }]}>
          <SignIn />
        </MemoryRouter>
      </HelmetProvider>
    );

    const robots = document.querySelector('meta[name="robots"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    expect(robots).toBeTruthy();
    expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute('href')).toBe('https://www.emvi.app/signin');
  });
});
