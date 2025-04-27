
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
  isFeatured?: boolean;
  squareFeet?: number;
  established?: number;
  chairs?: number;
}

export interface SalonFilters {
  location: string;
  priceRange: [number, number];
  listingType: string;
  searchTerm: string;
}
