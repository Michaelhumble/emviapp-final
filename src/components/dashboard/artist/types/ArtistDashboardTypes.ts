
import { UserProfile } from "@/context/auth/types";

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
}
