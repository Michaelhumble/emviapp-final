export interface Salon {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  features?: string[];
  square_feet?: number;
  monthly_rent?: number;
  monthly_revenue?: string;
  yearly_revenue?: string;
  image?: string;
  featured?: boolean;
  contact_info?: {
    phone?: string;
    email?: string;
    owner_name?: string;
  };
  
  // Additional properties for salon profile components
  city?: string;
  neighborhood?: string;
  rating?: number;
  reviewCount?: number;
  specialty?: string;
  logo?: string;
  bio?: string;
  shortBio?: string;
  services?: string[];
  established?: number | string;
  isHiring?: boolean;
  bookingLink?: string;
  email?: string;
  phone?: string;
  website?: string;
  beforeAfterGallery?: string[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: string;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
  amenities?: string[];
  paymentMethods?: string[];
  
  vietnamese_title?: string;
  vietnamese_description?: string;
  income_range?: string;
  monthly_rent?: number;
  is_vietnamese_listing?: boolean;
  contact_info: {
    phone?: string;
    email?: string;
    owner_name?: string;
    zalo?: string;
  };
}
