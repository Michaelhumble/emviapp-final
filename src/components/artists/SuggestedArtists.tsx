import React, { useState } from "react";
import { UserProfile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Bell, Mail, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuggestedArtists } from "@/hooks/useSuggestedArtists";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { useArtistInteractions } from "@/hooks/useArtistInteractions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AuthAction from "@/components/common/AuthAction";
import OfferModal from "@/components/artists/OfferModal";
import { getInitials } from "@/utils/userUtils";

interface SuggestedArtistsProps {
  currentArtistId?: string;
  className?: string;
}

const SuggestedArtists: React.FC<SuggestedArtistsProps> = ({ 
  currentArtistId, 
  className = ""
}) => {
  const { suggestedArtists, isLoading } = useSuggestedArtists(currentArtistId);
  
  // Don't show if there are no suggestions
  if (!isLoading && suggestedArtists.length === 0) return null;
  
  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          Artists You Might Love
          <span className="text-sm font-normal text-muted-foreground block mt-1">
            Những nghệ sĩ bạn có thể sẽ thích
          </span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            // Skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ArtistCardSkeleton key={index} />
            ))
          ) : (
            // Show suggested artists
            suggestedArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ArtistCard: React.FC<{ artist: UserProfile }> = ({ artist }) => {
  const isBoosted = artist.boosted_until && new Date(artist.boosted_until) > new Date();
  const { userRole } = useAuth();
  const isSalonOwner = userRole === 'salon' || userRole === 'owner';
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  
  const {
    isBookmarked,
    isFollowing,
    loading,
    toggleBookmark,
    toggleFollow,
    sendOffer
  } = useArtistInteractions(artist.id);
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow border-border/60">
      <CardContent className="p-4">
        <Link 
          to={`/u/${artist.id}`} 
          className="block"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || ""} />
              <AvatarFallback>
                {getInitials(artist.full_name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-sm truncate">
                  {artist.full_name}
                </h4>
                {isBoosted && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs border-amber-200">
                    Featured
                  </Badge>
                )}
              </div>
              
              {artist.specialty && (
                <p className="text-xs text-muted-foreground truncate">
                  {artist.specialty}
                </p>
              )}
              
              {artist.location && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{artist.location}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
        
        {/* Artist interaction buttons */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <TooltipProvider>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <AuthAction 
                  onAction={toggleBookmark}
                  creditMessage="Earn 2 credits when you save an artist"
                >
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      disabled={loading.bookmark}
                    >
                      <Heart 
                        className={`h-4 w-4 ${isBookmarked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                      />
                      <span className="sr-only">Save to My List</span>
                    </Button>
                  </TooltipTrigger>
                </AuthAction>
                <TooltipContent side="bottom">
                  {isBookmarked ? 'Remove from My List' : 'Save to My List (+2 credits)'}
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <AuthAction 
                  onAction={toggleFollow}
                  creditMessage="Earn 5 credits when you follow an artist"
                >
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      disabled={loading.follow}
                    >
                      <Bell 
                        className={`h-4 w-4 ${isFollowing ? 'fill-primary/20 text-primary' : 'text-muted-foreground'}`}
                      />
                      <span className="sr-only">Follow for Updates</span>
                    </Button>
                  </TooltipTrigger>
                </AuthAction>
                <TooltipContent side="bottom">
                  {isFollowing ? 'Unfollow Artist' : 'Follow for Updates (+5 credits)'}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          
          {/* Offer button - only for salon owners */}
          {isSalonOwner && (
            <TooltipProvider>
              <Tooltip>
                <AuthAction onAction={() => {
                  setOfferModalOpen(true);
                  return true;
                }}>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-8"
                    >
                      <SendHorizonal className="h-3 w-3 mr-1" />
                      Send Offer
                    </Button>
                  </TooltipTrigger>
                </AuthAction>
                <TooltipContent side="bottom">
                  Invite this artist to join your salon (5 credits)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {/* Offer Modal */}
        <OfferModal
          artistName={artist.full_name || "this artist"}
          onSendOffer={sendOffer}
          open={offerModalOpen}
          onOpenChange={setOfferModalOpen}
          isLoading={loading.offer}
        />
      </CardContent>
    </Card>
  );
};

const ArtistCardSkeleton: React.FC = () => {
  return (
    <Card className="h-full border-border/60">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedArtists;
