
export type UserRole = 'artist' | 'salon' | 'customer' | 'supplier' | 'freelancer' | 'other';

export interface UserProfile {
  id: string;
  full_name?: string;
  company_name?: string;
  role?: UserRole;
}
