export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const PERF_OVERLAY =
  String(import.meta.env.VITE_PERF_OVERLAY ?? 'false') === 'true';

// Feature flags - controlled by centralized config
import { FLAGS } from '@/config/flags';

export const ENABLE_SIGNUP_MODAL = FLAGS.signupModalEnabled;