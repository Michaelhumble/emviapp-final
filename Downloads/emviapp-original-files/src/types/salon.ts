
export interface SalonHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SalonReview {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Salon {
  id: string;
  created_at: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  description: string;
  services: string[];
  hours: SalonHours;
  images: string[];
  rating: number;
  reviews: SalonReview[];
  type: string;
  owner_id: string;
  verified?: boolean;
  social_media?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface SalonFilters {
  searchTerm: string;
  location: string;
  salonType: string;
  openNow: boolean;
}
