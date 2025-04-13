import React from "react";
import { UserProfile, getLocationString } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Bell, SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/utils/userUtils";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useArtistInteractions } from "@/hooks/useArtistInteractions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AuthAction from "@/components/common/AuthAction";
import OfferModal from "@/components/artists/OfferModal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ArtistGridProps {
  artists: UserProfile[];
  isLoading: boolean;
  error: any;
}

const ArtistGrid: React.FC<ArtistGridProps> = ({ artists, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <ArtistCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-red-500">Error loading artists: {error.message}</p>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-muted-foreground">No artists found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
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

  const locationString = getLocationString(artist.location);

  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <Link 
          to={`/u/${artist.id}`} 
          className="block p-4"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || ""} />
              <AvatarFallback>
                <ImageWithFallback 
                  src={artist.avatar_url || ""} 
                  alt={artist.full_name || "Artist"} 
                  className="h-full w-full object-cover"
                  fallbackImage="https://emvi.app/images/fallback-profile.jpg"
                />
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2 flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h3 className="font-medium">{artist.full_name}</h3>
                {isBoosted && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs border-amber-200">
                    Featured
                  </Badge>
                )}
              </div>
              
              {artist.specialty && (
                <p className="text-sm text-muted-foreground">{artist.specialty}</p>
              )}
              
              {locationString && (
                <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{locationString}</span>
                </div>
              )}
              
              {artist.bio && (
                <p className="text-sm text-gray-600 line-clamp-2">{artist.bio}</p>
              )}
            </div>
          </div>
        </Link>
        
        <div className="flex items-center justify-between px-4 py-3 bg-muted/10 border-t">
          <TooltipProvider>
            <div className="flex items-center space-x-2">
              <Tooltip>
                <AuthAction onAction={toggleBookmark}>
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
                  {isBookmarked ? 'Remove from My List' : 'Save to My List'}
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <AuthAction onAction={toggleFollow}>
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
                  {isFollowing ? 'Unfollow Artist' : 'Follow for Updates'}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          
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
                  Invite this artist to join your salon
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
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
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1 w-full">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t flex justify-between">
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistGrid;
