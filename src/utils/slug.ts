export function normalizeCityStateSlug(input: string): string {
  if (!input) return input;
  let slug = input.trim().toLowerCase();
  slug = slug.replace(/\s+/g, '-');
  // Common aliases
  slug = slug
    .replace(/\bsaint\b/g, 'st')
    .replace(/\bfort\b/g, 'ft');
  // Collapse repeated dashes
  slug = slug.replace(/-+/g, '-');
  return slug;
}

export function isAliasCitySlug(input: string): boolean {
  const normalized = normalizeCityStateSlug(input);
  // If input lowercased differs from normalized due to alias mapping, it's an alias
  const simpleLower = input.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
  return simpleLower !== normalized;
}

export function buildCityJobsCanonical(cityState: string) {
  const normalized = normalizeCityStateSlug(cityState);
  return {
    path: `/jobs/in/${normalized}`,
    permanent: true as const,
  };
}

export function buildRoleCityJobsCanonical(role: string, cityState: string) {
  const normalized = normalizeCityStateSlug(cityState);
  const roleNorm = role.trim().toLowerCase();
  return {
    path: `/jobs/${roleNorm}/${normalized}`,
    permanent: true as const,
  };
}

export function buildArtistsCityCanonical(specialty: string, cityState: string) {
  const normalized = normalizeCityStateSlug(cityState);
  const specNorm = specialty.trim().toLowerCase();
  return {
    path: `/artists/${specNorm}/${normalized}`,
    permanent: true as const,
  };
}
