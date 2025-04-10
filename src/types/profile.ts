export interface UserProfile {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  servicesOffered?: string[];
  yearsOfExperience?: number;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  gallery?: string[];
  pricing?: {
    hourlyRate?: number;
    fixedProject?: number;
  };
  paymentPreferences?: {
    paypal?: string;
    venmo?: string;
    cashApp?: string;
  };
  schedulingOptions?: {
    availability?: string[];
    bookingLink?: string;
  };
  reviews?: string[];
  averageRating?: number;
  additionalNotes?: string;
  lastSeen?: number;
  accountType?: string;
  profile_views?: number;
  is_active?: boolean;
  created_at?: number | string;
  updated_at?: number | string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: number;
  emailVerified?: boolean;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  preferred_language?: string;
  full_name?: string;
  id?: string;
  accepts_bookings?: boolean;
  phone?: string;
  instagram?: string;
  avatar_url?: string;
  specialty?: string;
  years_experience?: number;
  boosted_until?: string;
  role?: string;
  salon_name?: string;
  company_name?: string;
  booking_url?: string;
  completed_profile_tasks?: string[];
  badges?: any;
  contact_link?: string;
  preferences?: string[];
  affiliate_code?: string;
  referral_count?: number;
  portfolio_urls?: string[];
  credits?: number;
  skills?: string[];
  referral_code?: string;
  custom_role?: string;
  account_type?: string;
  user_id?: string;
  services?: any[];
}

export interface EmviUser {
  profile?: UserProfile;
}

export interface ArtistProfile extends UserProfile {
  specialties?: string[];
  portfolio?: string[];
  awards?: string[];
}

export interface SalonProfile extends UserProfile {
  salonName?: string;
  address?: string;
  employees?: string[];
  amenities?: string[];
}

export interface CustomerProfile extends UserProfile {
  preferences?: string[];
  bookingHistory?: string[];
}
