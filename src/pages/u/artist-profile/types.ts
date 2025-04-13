
import { UserProfile } from "@/types/profile";

export interface PortfolioImage {
  id: string;
  url: string;
  name?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

export interface ArtistProfileProps {
  profile: UserProfile;
  portfolioImages: PortfolioImage[];
  services: Service[];
  viewCount: number | null;
  isSalonOwner: boolean;
  profile_views?: number;
  years_experience?: number;
}
