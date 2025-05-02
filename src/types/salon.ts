
import { SalonCategory } from '@/utils/salonImageFallbacks';

export interface Salon {
  id: string;
  name: string;
  location: string;
  price: number | string;
  imageUrl: string;
  description: string;
  features?: string[];
  square_feet?: number;
  monthly_rent?: number;
  monthly_revenue?: string;
  yearly_revenue?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  contact_info?: {
    phone?: string;
    email?: string;
    owner_name?: string;
    zalo?: string;
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
  
  // Vietnamese listings properties
  vietnamese_title?: string;
  vietnamese_description?: string;
  income_range?: string;
  is_vietnamese_listing?: boolean;
  
  // Properties needed for SalonsForSale component
  title?: string;
  company?: string;
  salon_type?: string;
  salon_features?: string[];
  asking_price?: number | string;
  
  // Category for appropriate fallback image selection
  category?: SalonCategory;
  
  // Premium/luxury designation
  isPremium?: boolean;
  interiorStyle?: 'modern' | 'classic' | 'minimalist' | 'luxury' | 'designer';
  
  // Created at timestamp (needed for Job compatibility)
  created_at?: string;
  
  // Added marketplace specific properties to resolve type errors
  monthlyRent?: number;
  revenue?: number;
  staff?: number;
  willTrain?: boolean;
}
