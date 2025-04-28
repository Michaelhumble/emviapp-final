
export interface Salon {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  
  // Additional properties needed by featured salon components
  image?: string; // Used in featured components
  logo?: string;
  specialty?: string;
  city?: string;
  neighborhood?: string;
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: string; // Allow dynamic day access
  };
  bio?: string;
  shortBio?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  established?: number;
  services?: string[];
  amenities?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  paymentMethods?: string[];
  bookingLink?: string;
  isHiring?: boolean;
  featured?: boolean;
  phone?: string;
  email?: string;
  website?: string;
  beforeAfterGallery?: string[];
}
