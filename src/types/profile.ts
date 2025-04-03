
import { Database } from '@/integrations/supabase/types';
import { UserRole } from '@/context/auth/types';

// Re-export useful types from the generated Supabase types
export type DbSalon = Database['public']['Tables']['salons']['Row'];
export type DbSalonPhoto = Database['public']['Tables']['salon_photos']['Row'];
export type DbJob = Database['public']['Tables']['jobs']['Row'];
export type DbJobApplication = Database['public']['Tables']['job_applications']['Row'];

// Extended profile interfaces for each user type
export interface ArtistProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  specialty: string | null;
  location: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  phone: string | null;
  role: UserRole;
  // Artist-specific fields
  portfolio_images?: string[];
  services?: string[];
  experience?: string;
}

export interface SalonProfile extends DbSalon {
  owner_id: string;
  owner_name: string | null;
  owner_email: string | null;
  photos?: DbSalonPhoto[];
  jobs?: DbJob[];
}

export interface FreelancerProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  specialty: string | null;
  location: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  phone: string | null;
  role: UserRole;
  // Freelancer-specific fields
  services?: string[];
  pricing?: Record<string, any>;
}

export interface CustomerProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  location: string | null;
  phone: string | null;
  role: UserRole;
  // Customer-specific fields
  preferences?: string[];
  favorite_salons?: string[];
}

export interface VendorProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  company_name: string | null;
  location: string | null;
  bio: string | null;
  website: string | null;
  phone: string | null;
  role: UserRole;
  // Vendor-specific fields
  product_types?: string[];
  wholesale_info?: any;
}

export interface OtherProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  custom_role: string | null;
  location: string | null;
  bio: string | null;
  contact_link: string | null;
  phone: string | null;
  role: UserRole;
}
