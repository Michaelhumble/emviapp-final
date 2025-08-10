import { describe, it, expect } from 'vitest';
import fs from 'fs';

const read = (p: string) => fs.readFileSync(p, 'utf-8');

describe('Alias redirects for saint/fort slugs', () => {
  it('vercel.json includes saint/fort canonical redirects', () => {
    const cfg = JSON.parse(read('vercel.json'));
    const redirects = cfg.redirects || [];
    const exists = (source: string, destination: string) => redirects.some((r: any) => r.source === source && r.destination === destination && r.permanent === true);

    expect(exists('/jobs/in/saint-:rest', '/jobs/in/st-:rest')).toBe(true);
    expect(exists('/jobs/in/fort-:rest', '/jobs/in/ft-:rest')).toBe(true);
    expect(exists('/jobs/saint-:rest', '/jobs/st-:rest')).toBe(true);
    expect(exists('/jobs/:role/saint-:rest', '/jobs/:role/st-:rest')).toBe(true);
    expect(exists('/artists/:specialty/saint-:rest', '/artists/:specialty/st-:rest')).toBe(true);
  });
});
