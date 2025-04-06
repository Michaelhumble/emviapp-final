
import { UserProfile } from "@/context/auth/types";

export interface ArtistDashboardProps {
  // Add any props needed for the dashboard
}

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
}
