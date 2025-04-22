
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ArtistAvatar from "@/components/artists/ArtistAvatar";
import { CustomerFavorite } from "@/hooks/useCustomerDashboard";

interface FavoriteArtistCardProps {
  artist: CustomerFavorite;
}

const FavoriteArtistCard = ({ artist }: FavoriteArtistCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <ArtistAvatar
            imageUrl={artist.avatar_url}
            name={artist.name}
            size="lg"
            className="mb-3"
          />
          <h3 
            className="font-playfair font-medium text-lg mb-1 text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {artist.name}
          </h3>
          {artist.specialty && (
            <p className="text-sm text-gray-600 mb-3">{artist.specialty}</p>
          )}
          <Button 
            size="sm"
            variant="outline"
            className="w-full rounded-full border-primary/20 hover:bg-primary/5 text-primary"
          >
            Book Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteArtistCard;
