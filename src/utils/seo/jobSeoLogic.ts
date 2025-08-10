import { Job } from '@/types/job';
import { DEFAULT_JOB_VALID_DAYS } from '@/config/seo';

export function getValidThrough(job: Job): Date {
  if (job.expires_at) return new Date(job.expires_at);
  const base = job.created_at ? new Date(job.created_at) : new Date();
  const valid = new Date(base);
  valid.setDate(valid.getDate() + DEFAULT_JOB_VALID_DAYS);
  return valid;
}

export function isFilled(job: Job): boolean {
  const filledStatuses = ['filled', 'closed'];
  return filledStatuses.includes((job.status || '').toLowerCase());
}

export function shouldNoIndex(job: Job, now: Date = new Date()): boolean {
  const validThrough = getValidThrough(job);
  return isFilled(job) || validThrough.getTime() < now.getTime();
}

export function shouldReturn410(job: Job, now: Date = new Date()): boolean {
  // 410 after 30 days past validThrough or when filled
  const base = isFilled(job) ? (job.updated_at ? new Date(job.updated_at) : new Date()) : getValidThrough(job);
  const cutoff = new Date(base);
  cutoff.setDate(cutoff.getDate() + 30);
  return cutoff.getTime() < now.getTime();
}

export function stripHtml(input?: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
