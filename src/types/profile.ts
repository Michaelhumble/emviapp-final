import { User } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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
  created_at?: number;
  updated_at?: number;
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
}

export interface EmviUser extends User {
  profile?: UserProfile;
}

export interface ArtistProfile extends UserProfile {
  // Artist-specific fields here
  specialties?: string[];
  portfolio?: string[];
  awards?: string[];
}

export interface SalonProfile extends UserProfile {
  // Salon-specific fields here
  salonName?: string;
  address?: string;
  employees?: string[];
  amenities?: string[];
}

export interface CustomerProfile extends UserProfile {
  // Customer-specific fields here
  preferences?: string[];
  bookingHistory?: string[];
}
