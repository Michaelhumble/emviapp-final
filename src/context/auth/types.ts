


export type UserRole = 'artist' | 'salon' | 'customer' | 'supplier' | 'freelancer' | 'other';

export interface UserProfile {
  id: string;
  full_name?: string;
  company_name?: string;
  role?: UserRole;
  bio?: string;
  accepts_bookings?: boolean;
  avatar_url?: string;
  specialty?: string;
  location?: string;
  skills?: string[];
  instagram?: string;
  website?: string;
  years_experience?: number;
  preferences?: string[];
  preferred_language?: string;
  phone?: string;
  email?: string;
  credits?: number;
  boosted_until?: string;
  is_premium?: boolean;
}


