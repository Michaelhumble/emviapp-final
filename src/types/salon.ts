
// Salon listing type definition
export interface SalonListing {
  id: string;
  name: string;
  location: string;
  listing_type: 'For Sale' | 'Booth Rental' | 'Partnership';
  description: string;
  price: number;
  contact_hidden: boolean;
  created_at: string;
  is_featured?: boolean;
  image_url?: string;
  tags?: string[];
  // Extended properties
  squareFeet?: number;
  chairs?: number;
  established?: number;
  shortDescription?: string;
  features?: string[];
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

// Base Salon type definition (for salon profiles rather than listings)
export interface Salon {
  id: string;
  name: string;
  image?: string;
  logo?: string;
  specialty?: string;
  city?: string;
  neighborhood?: string;
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  bio?: string;
  shortBio?: string;
  rating?: number;
  reviewCount?: number;
  services: string[];
  amenities?: string[];
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
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  // Additional properties
  teamSize?: number;
  certifications?: string[];
  awards?: string[];
  paymentMethods?: string[];
  languages?: string[];
  accessibilityFeatures?: string[];
  virtualTours?: string[];
  beforeAfterGallery?: string[];
  established?: number;
  priceRange?: string;
  featured?: boolean;
}
