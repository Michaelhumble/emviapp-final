/**
 * Client-side job draft persistence.
 *
 * Anonymous visitors can fully compose a job without an account; the draft is
 * kept in localStorage (never inserted into the database) and restored after
 * signup/login so nobody loses their work.
 */

export interface JobDraft {
  title: string;
  category: string;
  salonName: string;
  location: string;
  compensationDetails: string;
  employmentType: string;
  description: string;
  vietnameseDescription: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  savedAt?: string;
}

export const JOB_DRAFT_KEY = 'emvi.jobDraft.v1';

export const emptyJobDraft: JobDraft = {
  title: '',
  category: '',
  salonName: '',
  location: '',
  compensationDetails: '',
  employmentType: 'full-time',
  description: '',
  vietnameseDescription: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
};

export const loadJobDraft = (): JobDraft | null => {
  try {
    const raw = localStorage.getItem(JOB_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return { ...emptyJobDraft, ...parsed } as JobDraft;
  } catch {
    return null;
  }
};

export const saveJobDraft = (draft: JobDraft) => {
  try {
    localStorage.setItem(
      JOB_DRAFT_KEY,
      JSON.stringify({ ...draft, savedAt: new Date().toISOString() })
    );
  } catch {
    /* storage unavailable — draft simply lives in component state */
  }
};

export const clearJobDraft = () => {
  try {
    localStorage.removeItem(JOB_DRAFT_KEY);
  } catch {
    /* no-op */
  }
};
