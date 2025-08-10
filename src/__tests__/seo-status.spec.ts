import { describe, it, expect } from 'vitest';
import { shouldNoIndex, shouldReturn410 } from '@/utils/seo/jobSeoLogic';

const now = new Date('2025-08-10T12:00:00Z');

const jobBase = {
  id: '1',
  title: 'Test',
  category: 'nails',
} as any;

describe('SEO job status logic', () => {
  it('noindex when expired', () => {
    const job = { ...jobBase, created_at: '2025-06-01T00:00:00Z' };
    expect(shouldNoIndex(job, now)).toBe(true);
  });

  it('noindex when filled', () => {
    const job = { ...jobBase, status: 'filled', created_at: '2025-08-01T00:00:00Z' };
    expect(shouldNoIndex(job, now)).toBe(true);
  });

  it('410 after 30 days past validThrough', () => {
    const job = { ...jobBase, created_at: '2025-05-01T00:00:00Z' };
    expect(shouldReturn410(job, now)).toBe(true);
  });
});
