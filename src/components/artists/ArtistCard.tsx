
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sparkles } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { formatLocation } from "@/utils/location";
import ArtistAvatar from "./ArtistAvatar";

interface ArtistCardProps {
  artist: UserProfile;
  size?: "sm" | "md" | "lg";
}

const ArtistCard = ({ artist, size = "md" }: ArtistCardProps) => {
  const isBoosted = artist.boosted_until && new Date(artist.boosted_until) > new Date();
  const locationString = formatLocation(artist.location);

  const sizeClasses = {
    sm: "gap-3 p-3",
    md: "gap-4 p-4",
    lg: "gap-5 p-5"
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/u/${artist.id}`}>
        <CardContent className={`flex items-start ${sizeClasses[size]}`}>
          <ArtistAvatar
            imageUrl={artist.avatar_url}
            name={artist.full_name}
            size={size === "sm" ? "md" : "lg"}
            fallbackType="placeholder"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium truncate">
                {artist.full_name || "Artist"}
              </h3>
              {isBoosted && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs border-amber-200">
                  <Sparkles className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
            
            {artist.specialty && (
              <p className="text-sm text-muted-foreground truncate mt-1">
                {artist.specialty}
              </p>
            )}
            
            {locationString && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{locationString}</span>
              </div>
            )}
            
            {artist.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                {artist.bio}
              </p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ArtistCard;
