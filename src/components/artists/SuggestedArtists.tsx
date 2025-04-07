
import React from "react";
import { UserProfile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuggestedArtists } from "@/hooks/useSuggestedArtists";

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
  
  return (
    <Link 
      to={`/u/${artist.id}`} 
      className="block"
    >
      <Card className="h-full hover:shadow-md transition-shadow border-border/60">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || ""} />
              <AvatarFallback>
                {artist.full_name?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || ""}
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
        </CardContent>
      </Card>
    </Link>
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
