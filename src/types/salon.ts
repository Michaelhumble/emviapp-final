
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
  created_at?: string;
}

export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
  hasHousing?: boolean;
  showExpired?: boolean;
}

