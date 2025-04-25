
export interface Location {
  lat: number | null;
  lng: number | null;
  address?: string | null;
  split?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface UserProfile {
  // Required properties
  id: string;
  email: string;
  
  // Auth related properties from auth context
  userId?: string;
  user_id?: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  avatar_url?: string;
  avatarUrl?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  
  // Profile information
  phone?: string;
  bio?: string;
  title?: string;
  specialty?: string;
  instagram?: string;
  website?: string;
  
  // Location data (can be string or object)
  location?: Location | string;
  
  // Professional information
  years_experience?: number;
  
  // Fields needed by components
  username?: string;
  boosted_until?: string;
  contact_link?: string;
  badges?: Record<string, any> | any[];
  accepts_bookings?: boolean;
  booking_url?: string;
  completed_profile_tasks?: string[];
  preferences?: string[];
  preferred_language?: string;
  referral_code?: string;
  referral_count?: number;
  credits?: number;
  profile_completion?: number;
  portfolio_urls?: string[];
  professional_name?: string;
  
  // Additional fields needed by components
  skills?: string[];
  independent?: boolean;
  creditsThisMonth?: number;
  artistTypes?: string[];
  favorite_artist_types?: string[];
  birthday?: string;
  commPrefs?: string[];
  communication_preferences?: string[];
  profile_views?: number;
  affiliate_code?: string;
  salon_name?: string;
  company_name?: string;
}

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
  title?: string;
  description?: string;
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
export function getPortfolioImages(profile: UserProfile): PortfolioImage[] {
  if (!profile) return [];
  
  // Handle array of portfolio URLs
  if (profile.portfolio_urls && Array.isArray(profile.portfolio_urls)) {
    return profile.portfolio_urls.map((url, index) => ({
      id: `portfolio-${index}`,
      url: typeof url === 'string' ? url : '',
      title: `Portfolio image ${index + 1}`
    }));
  }
  
  // Empty default
  return [];
}
