
import { UserRole } from '@/context/auth/types';

export interface DatabaseProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  phone: string | null;
  location: string | null;
  bio: string | null;
  website: string | null;
  social_links: any;
  specialties: string[] | null;
  experience_years: number | null;
  hourly_rate: number | null;
  accepts_bookings: boolean;
  booking_url: string | null;
  portfolio_images: string[] | null;
  certifications: string[] | null;
  languages: string[] | null;
  business_name: string | null;
  business_address: string | null;
  business_phone: string | null;
  business_hours: any;
  services_offered: string[] | null;
  team_size: number | null;
  years_in_business: number | null;
  license_number: string | null;
  insurance_info: string | null;
  contact_link: string | null;
  badges: any; // Json type from database
  completed_profile_tasks: string[];
  boosted_until: string | null;
  subscription_tier: string | null;
  credits: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  location: string | null;
  bio: string | null;
  website: string | null;
  social_links: any;
  specialties: string[] | null;
  experience_years: number | null;
  hourly_rate: number | null;
  accepts_bookings: boolean;
  booking_url: string | null;
  portfolio_images: string[] | null;
  certifications: string[] | null;
  languages: string[] | null;
  business_name: string | null;
  business_address: string | null;
  business_phone: string | null;
  business_hours: any;
  services_offered: string[] | null;
  team_size: number | null;
  years_in_business: number | null;
  license_number: string | null;
  insurance_info: string | null;
  contact_link: string | null;
  badges: string[];
  completed_profile_tasks: string[];
  boosted_until: string | null;
  subscription_tier: string | null;
  credits: number;
  created_at: string;
  updated_at: string;
}

export function normalizeUserProfile(dbProfile: DatabaseProfile): UserProfile {
  return {
    ...dbProfile,
    role: dbProfile.role as UserRole,
    badges: Array.isArray(dbProfile.badges) ? dbProfile.badges : []
  };
}
