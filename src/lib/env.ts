export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const PERF_OVERLAY =
  String(import.meta.env.VITE_PERF_OVERLAY ?? 'false') === 'true';

// Feature flags
export const ENABLE_SIGNUP_MODAL = 
  String(import.meta.env.VITE_ENABLE_SIGNUP_MODAL ?? 'false') === 'true';