
import { Award, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile, getLocationString } from "@/types/profile";

interface ArtistCardProps {
  artist: UserProfile;
  getArtistRating: (artistId: string) => number;
}

const ArtistCard = ({ artist, getArtistRating }: ArtistCardProps) => {
  // Get location string
  const locationString = getLocationString(artist.location);
  
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <Avatar className="h-12 w-12 border border-primary/10">
        <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || "Artist"} />
        <AvatarFallback className="bg-primary/5 text-primary">
          {artist.full_name?.charAt(0) || "NA"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{artist.full_name}</p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground truncate">
            {artist.specialty || 'Nail Artist'}
          </span>
          
          {artist.boosted_until && new Date(artist.boosted_until) > new Date() && (
            <Badge variant="outline" className="text-[0.65rem] py-0 px-1 border-amber-300 text-amber-600 bg-amber-50">
              <Sparkles className="h-2.5 w-2.5 mr-0.5" />
              Pro
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-center text-amber-500">
          <Award className="h-3 w-3" />
          <span className="text-xs font-medium ml-0.5">{getArtistRating(artist.id)}</span>
        </div>
        <span className="text-[0.65rem] text-muted-foreground">
          {locationString ? locationString.split(',')[0] : 'Local'}
        </span>
      </div>
    </div>
  );
};

export default ArtistCard;
