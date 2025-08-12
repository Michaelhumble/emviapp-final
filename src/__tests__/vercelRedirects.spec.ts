import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';

interface RedirectRule {
  source: string;
  destination: string;
  permanent?: boolean;
  has?: any[];
}

interface VercelConfig {
  redirects?: RedirectRule[];
}

describe('vercel.json redirects', () => {
  const configPath = path.resolve(process.cwd(), 'vercel.json');
  const json: VercelConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const redirects = json.redirects || [];

  const findRule = (source: string, destination: string) =>
    redirects.find((r) => r.source === source && r.destination === destination && r.permanent === true);

  it('has 301 /sign-in → /signin', () => {
    expect(findRule('/sign-in', '/signin')).toBeTruthy();
  });

  it('has 301 /sign-in/(.*) → /signin/$1', () => {
    expect(findRule('/sign-in/(.*)', '/signin/$1')).toBeTruthy();
  });

  it('has 301 /login → /signin', () => {
    expect(findRule('/login', '/signin')).toBeTruthy();
  });

  it('has 301 /auth/signup → /signup', () => {
    expect(findRule('/auth/signup', '/signup')).toBeTruthy();
  });

  it('has 301 /auth/signin → /signin', () => {
    expect(findRule('/auth/signin', '/signin')).toBeTruthy();
  });

  it('has 301 legacy mission-vision blog path → canonical', () => {
    expect(findRule('/blog/emviapp-vision/emviapp-mission-vision', '/emviapp-mission-vision')).toBeTruthy();
  });
});
