
/**
 * Types related to booth rentals
 */

export interface BoothRental {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  priceUnit: 'day' | 'week' | 'month';
  imageUrl: string;
  available: boolean;
  availableFrom: string;
  features: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  salonName: string;
  salonId?: string;
}

export interface BoothListItem {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: 'day' | 'week' | 'month';
  imageUrl: string;
  available: boolean;
}
