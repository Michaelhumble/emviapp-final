
export interface Location {
  lat: number | null;
  lng: number | null;
  address?: string | null;
  split?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface OpeningTime {
  day: string;
  open: string;
  close: string;
}

// Re-export UserProfile from auth context to maintain consistency
export type { UserProfile } from '@/context/auth/types';

// Helper function to safely get location as a string for display
export function getLocationString(location: Location | string | undefined | null): string {
  if (!location) return '';
  
  if (typeof location === 'string') {
    return location;
  }
  
  // Handle Location object
  return location.address || '';
}

// New interface for portfolio images
export interface PortfolioImage {
  id: string;
  url: string;
  alt?: string;
  created_at?: string;
}

// New interface for service items
export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

// Helper function to safely get portfolio images
export function getPortfolioImages(profile: any): PortfolioImage[] {
  if (!profile) return [];
  
  // Handle array of image URLs
  if (profile.gallery && Array.isArray(profile.gallery)) {
    return profile.gallery.map((url, index) => ({
      id: `gallery-${index}`,
      url: typeof url === 'string' ? url : '',
      alt: `Portfolio image ${index + 1}`
    }));
  }
  
  // Handle portfolio_urls
  if (profile.portfolio_urls && Array.isArray(profile.portfolio_urls)) {
    return profile.portfolio_urls.map((url, index) => ({
      id: `portfolio-${index}`,
      url: typeof url === 'string' ? url : '',
      alt: `Portfolio image ${index + 1}`
    }));
  }
  
  // Empty default
  return [];
}
