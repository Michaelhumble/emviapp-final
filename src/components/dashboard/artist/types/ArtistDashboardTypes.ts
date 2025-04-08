
import { UserProfile } from "@/context/auth/types";

export interface ArtistProfileState {
  artistProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface ArtistDataContextType extends ArtistProfileState {
  handleCopyReferralLink: () => void;
  copied: boolean;
  firstName: string;
  userCredits: number;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
}

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

// Add a type for booking schedule
export interface DaySchedule {
  day: string;
  time: string;
  active: boolean;
}

// Add types for bookings
export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'accepted' | 'declined';
  note?: string;
  created_at: string;
  customer_name?: string;
  service_name?: string;
}

export interface BookingCounts {
  pending: number;
  upcoming: number;
}
