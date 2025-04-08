
export interface UserProfile {
  id: string;
  user_id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  specialty?: string;
  services?: string[];
  location?: string;
  social_links?: SocialLinks;
  avatar_url?: string;
  gallery?: string[];
  availability?: string[];
  role?: UserRole;
  verification_status?: 'pending' | 'verified' | 'rejected';
  created_at?: string;
  updated_at?: string;
  salon_name?: string;
  company_name?: string;
  product_type?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
  preferred_language?: 'en' | 'vi' | 'es';
  profile_views?: number;
  account_type?: 'free' | 'pro' | 'enterprise';
  affiliate_code?: string;
  referral_count?: number;
  skill_level?: string;
  skills?: string[];
  preferences?: string[];
  accepts_bookings?: boolean;
  booking_url?: string;
  boosted_until?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export type UserRole = 
  | 'artist' 
  | 'salon' 
  | 'customer' 
  | 'freelancer' 
  | 'vendor' 
  | 'supplier' 
  | 'beauty supplier' 
  | 'owner' 
  | 'nail technician/artist'
  | 'renter'
  | 'other';
