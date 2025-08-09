export function normalizeToE164(input: string, defaultCountry: string = 'US'): string | null {
  if (input == null) return null;
  let raw = String(input).trim();
  if (!raw) return null;

  // If starts with '+', strip all non-digits after it and validate E.164
  if (raw.startsWith('+')) {
    const digits = raw.slice(1).replace(/\D+/g, '');
    const normalized = `+${digits}`;
    return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
  }

  // Otherwise, strip to digits only
  const digitsOnly = raw.replace(/\D+/g, '');

  if (defaultCountry === 'US') {
    if (digitsOnly.length === 10) return `+1${digitsOnly}`;
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) return `+${digitsOnly}`;
    return null;
  }

  // For now, no international inference without +
  return null;
}

export function maskPhone(phone: string): string {
  // Try to normalize first; if fails, fall back to raw
  const normalized = normalizeToE164(phone) ?? phone.trim();
  const last4 = normalized.replace(/\D/g, '').slice(-4);

  if (normalized.startsWith('+1')) {
    return `+1••• ••${last4}`;
  }

  // Generic fallback: keep country prefix (first 2 chars, e.g., +4), mask middle, show last 4
  const prefix = normalized.startsWith('+') ? normalized.slice(0, 2) : normalized.slice(0, 2);
  return `${prefix}••• ••${last4}`;
}
