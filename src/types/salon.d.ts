
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
