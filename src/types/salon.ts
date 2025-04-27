
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

// Listing specific interface
export interface SalonListing {
  id: string;
  name: string;
  location: string;
  type: 'For Sale' | 'Booth Rental' | 'Full Salon';
  price?: number;
  priceUnit?: 'one-time' | 'monthly' | 'weekly';
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
  established?: number;
  chairs?: number;
  status?: string;
  salon_features?: string[];
  company?: string;
  vietnamese_description?: string;
  asking_price?: string;
  has_housing?: boolean;
  square_feet?: string;  // Added for backward compatibility
  created_at: string;    // Changed from optional to required to match Job type
}

// Define Job type compatibility with SalonListing
export interface Job extends SalonListing {
  // Additional Job-specific fields are defined in src/types/job.ts
}

export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
  hasHousing?: boolean;
  showExpired?: boolean;
}
