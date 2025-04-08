
import { UserProfile } from "@/context/auth/types";

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

export interface ArtistProfileState {
  artistProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface ArtistDataContextType extends ArtistProfileState {
  firstName: string;
  userCredits: number;
  copied: boolean;
  handleCopyReferralLink: () => void;
  refreshArtistProfile: () => Promise<void>;
  portfolioImages: PortfolioImage[];
  loadingPortfolio: boolean;
}
