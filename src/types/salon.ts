
// Base interface for common properties
export interface ISalonBase {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url?: string;
  price?: number;
  contact_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  status?: 'active' | 'expired' | 'draft';
  is_featured?: boolean;
}

// Standardized SalonListing type for salon marketplace
export interface SalonListing extends ISalonBase {
  listing_type: 'For Sale' | 'Booth Rental' | 'Partnership';
  contact_hidden: boolean;
  features?: string[];
  salon_features?: string[];
  square_feet?: number;
  asking_price?: string; // For backward compatibility
  vietnamese_description?: string;
  has_housing?: boolean;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  reason_for_selling?: string;
  revenue?: string;
  owner_will_train?: boolean;
  // These were missing and causing errors in the components
  image?: string;
  type?: string;
  shortDescription?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  priceUnit?: string;
  established?: number;
}

// Job posting type
export interface Job extends ISalonBase {
  title: string;
  company?: string;
  employment_type?: string;
  compensation_type?: string;
  compensation_details?: string;
  role?: string;
  weekly_pay?: boolean;
  tip_range?: string;
  salary_range?: string;
  is_remote?: boolean;
  is_urgent?: boolean;
  preferred_languages?: string[];
  benefits?: string[];
  experience_level?: string;
  specialties?: string[];
  // These were missing and causing errors in the components
  features?: string[];
  image?: string;
  type?: string;
  shortDescription?: string;
  squareFeet?: number;
  asking_price?: string;
  square_feet?: number;
  established?: number;
}

// Add the Salon type which is used by salon profile components
export interface Salon {
  id: string;
  name: string;
  owner_id?: string;
  location?: string;
  city: string;
  image: string;
  logo?: string;
  bio: string;
  shortBio?: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  established?: number;
  isHiring?: boolean;
  neighborhood?: string;
  services: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
  paymentMethods?: string[];
  phone?: string;
  email?: string;
  website?: string;
  bookingLink?: string;
  beforeAfterGallery?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };
}

// Filters interface
export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
  hasHousing?: boolean;
  showExpired?: boolean;
}
