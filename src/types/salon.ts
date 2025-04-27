
// Base salon listing interface
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
  created_at: string;
  
  // Additional properties that are being used
  image?: string;
  type?: string;
  priceUnit?: string;
  shortDescription?: string;
  features?: string[];
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  tags?: string[];
  squareFeet?: number;
  square_feet?: string;
  established?: number;
  company?: string;
  contact_info?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  monthly_rent?: number;
  number_of_stations?: number;
  revenue?: number;
  chairs?: number;
  has_wax_room?: boolean;
  has_dining_room?: boolean;
  has_laundry?: boolean;
  owner_will_train?: boolean;
  reason_for_selling?: string;
  salon_features?: string[];
  asking_price?: string;
  has_housing?: boolean;
  vietnamese_description?: string;
  status?: string;
  isFeatured?: boolean; // Alternate naming for compatibility
}

// For backward compatibility with existing ISalon interface
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
  featured?: boolean;
  bookingLink?: string;
  isHiring?: boolean;
}

// Extended Salon interface
export interface Salon extends ISalon {
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

// SalonFilters interface for search/filter functionality
export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
  hasHousing?: boolean;
  showExpired?: boolean;
}

// Re-export Job type for backward compatibility
export interface Job extends SalonListing {
  role?: string;
  title?: string;
  employment_type?: string;
  salary_range?: string;
  posted_at?: string;
  status?: 'active' | 'expired';
  weekly_pay?: boolean;
  benefits?: string[];
}

// Add SalonSale type for backward compatibility
export interface SalonSale extends SalonListing {
  salon_name?: string;
  city?: string;
  state?: string;
  business_type?: string;
}
