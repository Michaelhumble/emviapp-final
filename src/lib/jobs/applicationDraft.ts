/**
 * Client-side job application draft persistence.
 *
 * Anonymous visitors can compose an application without an account; the draft is
 * kept in localStorage (never inserted into the database) and restored after
 * signup/login so nobody loses their work.
 */

export interface ApplicationDraft {
  jobId: string;
  message: string;
  phone: string;
  savedAt?: string;
}

const KEY_PREFIX = 'emvi.applicationDraft.v1:';
export const PENDING_APPLICATION_KEY = 'emvi.pendingApplicationJobId.v1';

export const emptyApplicationDraft = (jobId: string): ApplicationDraft => ({
  jobId,
  message: '',
  phone: '',
});

export const loadApplicationDraft = (jobId: string): ApplicationDraft | null => {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + jobId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return { ...emptyApplicationDraft(jobId), ...parsed } as ApplicationDraft;
  } catch {
    return null;
  }
};

export const saveApplicationDraft = (draft: ApplicationDraft) => {
  try {
    localStorage.setItem(
      KEY_PREFIX + draft.jobId,
      JSON.stringify({ ...draft, savedAt: new Date().toISOString() })
    );
  } catch {
    /* storage unavailable — draft simply lives in component state */
  }
};

export const clearApplicationDraft = (jobId: string) => {
  try {
    localStorage.removeItem(KEY_PREFIX + jobId);
  } catch {
    /* no-op */
  }
};

export const markPendingApplication = (jobId: string) => {
  try {
    localStorage.setItem(PENDING_APPLICATION_KEY, jobId);
  } catch {
    /* no-op */
  }
};

export const takePendingApplication = (): string | null => {
  try {
    const v = localStorage.getItem(PENDING_APPLICATION_KEY);
    if (v) localStorage.removeItem(PENDING_APPLICATION_KEY);
    return v;
  } catch {
    return null;
  }
};
