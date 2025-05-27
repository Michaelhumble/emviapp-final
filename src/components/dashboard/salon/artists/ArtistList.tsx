
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import { useTranslation } from "@/hooks/useTranslation";
import { Skeleton } from "@/components/ui/skeleton";
import ArtistCard from "./ArtistCard";

interface ArtistListProps {
  displayedArtists: UserProfile[];
  isLoading: boolean;
  getArtistRating: (artistId: string) => number;
}

const ArtistList = ({ displayedArtists, isLoading, getArtistRating }: ArtistListProps) => {
  const { t } = useTranslation();
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-muted"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (displayedArtists.length === 0) {
    return (
      <div className="text-center py-6">
        <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{t("No artists found in your area yet")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("Check back soon as our network grows!")}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      {displayedArtists.map(artist => (
        <ArtistCard key={artist.id} artist={artist} getArtistRating={getArtistRating} />
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-dashed border-primary/30 text-primary mt-4"
      >
        {t("View all top artists in your area")}
      </Button>
    </div>
  );
};

export default ArtistList;
