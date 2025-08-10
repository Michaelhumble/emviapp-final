export const ALLOWED_REDIRECT_PREFIXES = [
  '/jobs',
  '/artists',
  '/salons',
  '/blog',
  '/dashboard',
  '/post-job',
] as const;

const MAX_REDIRECT_LENGTH = 200;

const stripNestedRedirectParams = (pathWithQuery: string): string => {
  const [path, query = ''] = pathWithQuery.split('?');
  if (!query) return path;
  const params = new URLSearchParams(query);
  // Remove any nested redirect params
  params.delete('redirect');
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
};

const normalizeInternal = (input: string): string | null => {
  let candidate = input.trim();
  try {
    if (/^https?:\/\//i.test(candidate)) {
      const url = new URL(candidate);
      const host = url.hostname.replace(/^www\./, '');
      if (host !== 'emvi.app') return null;
      candidate = url.pathname + url.search;
    }
  } catch {
    // If URL parsing fails, treat as relative path
  }
  if (!candidate.startsWith('/')) return null;
  return candidate;
};

export const sanitizeRedirect = (raw: string | null | undefined): string => {
  const fallback = '/jobs';
  if (!raw) return fallback;

  // Cap length early to avoid abuse
  let normalized = raw.slice(0, MAX_REDIRECT_LENGTH);

  const internal = normalizeInternal(normalized);
  if (!internal) return fallback;

  // Prevent loops to sign-in endpoints
  if (internal.startsWith('/signin') || internal.startsWith('/auth/signin') || internal.startsWith('/sign-in')) {
    return fallback;
  }

  // Strip nested redirect params
  normalized = stripNestedRedirectParams(internal);

  // Allow only whitelisted prefixes (including subpaths)
  const allowed = ALLOWED_REDIRECT_PREFIXES.some((p) => normalized === p || normalized.startsWith(`${p}/`) || normalized.startsWith(`${p}?`));
  if (!allowed) return fallback;

  return normalized;
};
