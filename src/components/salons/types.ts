
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
