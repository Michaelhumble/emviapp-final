
// Core Salon Types
export interface Salon {
  id: string;
  owner_id?: string;
  salon_name: string;
  logo_url?: string;
  location?: string;
  about?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
  
  // Frontend display properties
  name?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  city?: string;
  neighborhood?: string;
  isHiring?: boolean;
  specialty?: string;
  featured?: boolean;
  logo?: string;
  bio?: string;
  shortBio?: string;
  services?: string[];
  established?: string;
  email?: string;
  bookingLink?: string;
  hours?: Record<string, string>;
  amenities?: string[];
  paymentMethods?: string[];
  beforeAfterGallery?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    pinterest?: string;
    youtube?: string;
  };
}

export interface SalonContextType {
  salons: Salon[];
  currentSalon: Salon | null;
  isLoadingSalons: boolean;
  createSalon: (salonData: Partial<Salon>) => Promise<boolean>;
  selectSalon: (salonId: string) => void;
  refreshSalons: () => Promise<void>;
  updateSalon: (salonId: string, data: Partial<Salon>) => Promise<boolean>;
  deleteSalon: (salonId: string) => Promise<boolean>;
}

// Define chart data interface before using it
export interface ChartBookingData {
  weekLabel: string;
  count: number;
}

// Analytics Types
export interface BookingsStats {
  total: number;
  pending: number;
  accepted: number;
  completed: number;
  cancelled: number;
  chartData: ChartBookingData[];
}

export interface SalonService {
  id: string;
  salon_id: string;
  name: string;
  description?: string;
  price: number;
  duration_min: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface SalonTeamMember {
  id: string;
  full_name: string;
  specialty: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;
  email: string;
  avatar_url?: string;
}

export interface SalonBooking {
  id: string;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  service_name: string;
  service_price: number;
  date: Date | null;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
  assigned_staff_name: string | null;
  assigned_staff_id: string | null;
  notes?: string;
  created_at: string;
}

// Stats & Analytics
export interface SalonStats {
  applicantsThisMonth: number;
  activeJobPosts: number;
  creditsRemaining: number;
  profileCompletion: {
    percentage: number;
    incompleteFields: string[];
  };
}
