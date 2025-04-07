
import { useArtistBookmark } from "./useArtistBookmark";
import { useArtistFollow } from "./useArtistFollow";
import { useArtistOffer } from "./useArtistOffer";
import { InteractionLoadingState, UseArtistInteractionsReturn } from "./types";

export * from "./types";

export const useArtistInteractions = (artistId: string): UseArtistInteractionsReturn => {
  const { isBookmarked, loading: bookmarkLoading, toggleBookmark } = useArtistBookmark(artistId);
  const { isFollowing, loading: followLoading, toggleFollow } = useArtistFollow(artistId);
  const { loading: offerLoading, sendOffer } = useArtistOffer(artistId);
  
  const loading: InteractionLoadingState = {
    bookmark: bookmarkLoading,
    follow: followLoading,
    offer: offerLoading
  };

  return {
    isBookmarked,
    isFollowing,
    loading,
    toggleBookmark,
    toggleFollow,
    sendOffer
  };
};
