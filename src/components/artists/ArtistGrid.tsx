
import { UserProfile } from "@/types/profile";
import { Skeleton } from "@/components/ui/skeleton";
import ArtistCard from "./ArtistCard";

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
      <div className="text-center p-8 bg-muted/10 rounded-lg">
        <p className="text-red-500">Error loading artists: {error.message}</p>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/10 rounded-lg">
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

const ArtistCardSkeleton = () => {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-[60%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </div>
    </div>
  );
};

export default ArtistGrid;
