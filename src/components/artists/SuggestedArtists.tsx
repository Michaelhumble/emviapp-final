
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, getLocationString } from "@/types/profile";

interface SuggestedArtistsProps {
  className?: string;
  limit?: number;
}

const SuggestedArtists: React.FC<SuggestedArtistsProps> = ({ 
  className = "", 
  limit = 5 
}) => {
  const { data: artists, isLoading } = useQuery({
    queryKey: ['suggestedArtists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('role', ['artist', 'nail technician/artist', 'freelancer'])
        .neq('full_name', '')
        .order('boosted_until', { ascending: false, nullsFirst: false })
        .limit(limit);
        
      if (error) {
        throw new Error(error.message);
      }
      
      return data as unknown as UserProfile[];
    }
  });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Suggested Artists</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ArtistSkeletonItem key={i} />
            ))}
          </div>
        ) : artists && artists.length > 0 ? (
          <div className="divide-y">
            {artists.map(artist => (
              <ArtistItem key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No suggested artists found.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ArtistItem: React.FC<{ artist: UserProfile }> = ({ artist }) => {
  const isBoosted = artist.boosted_until && new Date(artist.boosted_until) > new Date();
  
  // Get location string safely
  const locationString = getLocationString(artist.location);

  return (
    <Link
      to={`/u/${artist.id}`}
      className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
    >
      <Avatar className="h-10 w-10 border border-primary/10">
        <AvatarImage src={artist.avatar_url || ""} alt={artist.full_name || "Artist"} />
        <AvatarFallback>
          {artist.full_name ? artist.full_name.substring(0, 2).toUpperCase() : "AR"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="font-medium text-sm truncate">
            {artist.full_name || "Artist"}
          </p>
          
          {isBoosted && (
            <Sparkles className="h-3 w-3 text-amber-500" />
          )}
        </div>
        
        {artist.specialty && (
          <p className="text-xs text-muted-foreground truncate">
            {artist.specialty}
          </p>
        )}
      </div>
      
      {locationString && (
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate max-w-[80px]">{locationString}</span>
        </div>
      )}
    </Link>
  );
};

const ArtistSkeletonItem: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  );
};

export default SuggestedArtists;
