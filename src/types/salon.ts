
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

// Re-export existing types
export type { Salon } from '@/types/salon';
