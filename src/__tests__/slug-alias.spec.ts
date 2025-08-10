import { describe, it, expect } from 'vitest';
import { normalizeCityStateSlug, buildCityJobsCanonical, buildRoleCityJobsCanonical, buildArtistsCityCanonical } from '@/utils/slug';

describe('City/Role slug normalization and canonicals', () => {
  it('normalizes saint and fort aliases', () => {
    expect(normalizeCityStateSlug('saint louis mo')).toBe('st-louis-mo');
    expect(normalizeCityStateSlug('fort worth tx')).toBe('ft-worth-tx');
    expect(normalizeCityStateSlug('Los  Angeles  CA')).toBe('los-angeles-ca');
  });

  it('builds city jobs canonical', () => {
    const c = buildCityJobsCanonical('saint-louis-mo');
    expect(c.path).toBe('/jobs/in/st-louis-mo');
  });

  it('builds role city jobs canonical', () => {
    const c = buildRoleCityJobsCanonical('nails', 'fort-worth-tx');
    expect(c.path).toBe('/jobs/nails/ft-worth-tx');
  });

  it('builds artists city canonical', () => {
    const c = buildArtistsCityCanonical('nails', 'saint-paul-mn');
    expect(c.path).toBe('/artists/nails/st-paul-mn');
  });
});
