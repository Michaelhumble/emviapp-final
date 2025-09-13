export const ALLOWED_ROLES = ['customer', 'artist', 'salon_owner', 'freelancer'] as const;
export type AllowedRole = typeof ALLOWED_ROLES[number];

export function isValidRole(v: unknown): v is AllowedRole {
  return typeof v === 'string' && ALLOWED_ROLES.includes(v as AllowedRole);
}