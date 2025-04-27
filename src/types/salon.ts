
// Salon type definition
export interface Salon {
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
  // Additional properties for salon listings
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

// Simplified SalonListing interface to fix type errors
export interface SalonListing {
  id: string;
  name: string;
  location: string;
  listing_type: 'For Sale' | 'Booth Rental' | 'Partnership';
  description: string;
  price: number;
  contact_hidden: boolean;
  is_featured?: boolean;
  image_url?: string;
  tags?: string[];
  company?: string;
  salon_name?: string;
  salon_features?: string[];
  asking_price?: string;
  status?: 'active' | 'expired' | 'pending';
  created_at: string;
  has_housing?: boolean;
  square_feet?: string;
  vietnamese_description?: string;
}

// Simplified SalonFilters interface to fix type errors
export interface SalonFilters {
  searchTerm?: string;
  category?: string;
  priceRange: number[];
  location: string;
  features?: string[];
  sortBy?: string;
  featured?: boolean;
  showExpired?: boolean;
  hasHousing?: boolean;
  industry?: string;
  stations?: number;
  squareFeet?: [number, number];
}
