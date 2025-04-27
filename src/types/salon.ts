
// Base interfaces
export interface ISalon {
  id: string;
  name: string;
  image: string;
  logo?: string;
  specialty: string;
  city: string;
  neighborhood?: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  bio: string;
  shortBio?: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  established: number;
  services: string[];
  amenities: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    pinterest?: string;
    youtube?: string;
  };
  bookingLink?: string;
  isHiring?: boolean;
  featured?: boolean;
}

// For backward compatibility - extend ISalon with additional properties
export interface Salon extends ISalon {
  // Additional properties used in salon components
  owner?: string;
  email?: string;
  phone?: string;
  website?: string;
  teamSize?: number;
  certifications?: string[];
  awards?: string[];
  paymentMethods?: string[];
  languages?: string[];
  accessibilityFeatures?: string[];
  virtualTours?: string[];
  beforeAfterGallery?: string[];
}

// Listing specific interface with common properties for SalonListing and Job
export interface BaseListingType {
  id: string;
  location: string;
  description: string;
  shortDescription?: string;
  image?: string;
  features?: string[];
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  isFeatured?: boolean;
  is_featured?: boolean;
  squareFeet?: number;
  square_feet?: string; // Added for backward compatibility
  established?: number;
  chairs?: number;
  status?: string;
  salon_features?: string[];
  company?: string;
  vietnamese_description?: string;
  asking_price?: string;
  has_housing?: boolean;
  created_at: string;
  title?: string; // Added to support both Job and SalonListing
  name?: string; // Made optional since Job might use title instead
}

// Listing specific interface
export interface SalonListing extends BaseListingType {
  name: string; // SalonListing requires name
  type: 'For Sale' | 'Booth Rental' | 'Full Salon';
  price?: number;
  priceUnit?: 'one-time' | 'monthly' | 'weekly';
}

// Define Job type compatibility with SalonListing
export interface Job extends BaseListingType {
  // Job-specific fields
  role?: string;
  employment_type?: string;
  compensation_details?: string;
  compensation_type?: string;
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
  for_sale?: boolean;
  number_of_stations?: string;
  reason_for_selling?: string;
  specialties?: string[];
  weekly_pay?: boolean;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  tip_range?: string;
  salary_range?: string;
  salon_type?: string;
  expires_at?: string;
  boosted_until?: string;
  user_id?: string;
  requirements?: string[] | string;
  preferred_languages?: string[];
  benefits?: string[];
  revenue?: string;
  experience_level?: string;
  is_remote?: boolean;
  role_normalized?: string;
  is_urgent?: boolean;
  type?: string;
  monthly_rent?: string;
}

export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
  hasHousing?: boolean;
  showExpired?: boolean;
}
