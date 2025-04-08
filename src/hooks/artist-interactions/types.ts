
// Remove the User import since we don't need it
export type InteractionType = "bookmark" | "follow" | "offer";

export interface InteractionLoadingState {
  bookmark: boolean;
  follow: boolean;
  offer: boolean;
}

export interface UseArtistBookmarkReturn {
  isBookmarked: boolean;
  loading: boolean;
  toggleBookmark: () => Promise<boolean>;
}

export interface UseArtistFollowReturn {
  isFollowing: boolean;
  loading: boolean;
  toggleFollow: () => Promise<boolean>;
}

export interface UseArtistOfferReturn {
  loading: boolean;
  sendOffer: (message: string) => Promise<boolean>;
}

export interface UseArtistInteractionsReturn {
  isBookmarked: boolean;
  isFollowing: boolean;
  loading: InteractionLoadingState;
  toggleBookmark: () => Promise<boolean>;
  toggleFollow: () => Promise<boolean>;
  sendOffer: (message: string) => Promise<boolean>;
}
