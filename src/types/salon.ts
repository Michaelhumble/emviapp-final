
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
