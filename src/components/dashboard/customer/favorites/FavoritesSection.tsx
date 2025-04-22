
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import FavoriteArtistCard from "./FavoriteArtistCard";

const FavoritesSection = () => {
  const { favorites, loading } = useCustomerDashboard();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          Your Favorite Artists
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Heart className="h-6 w-6 text-pink-500" />
          Your Favorite Artists
        </h2>
        <Card className="bg-gradient-to-r from-pink-50 to-pink-100/30">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <Heart className="h-10 w-10 text-pink-300 mb-3 animate-pulse" />
            <p className="text-gray-700 mb-2 font-medium text-lg">You haven't saved any favorite artists yet.</p>
            <span className="text-gray-500 mb-5">Explore top professionals and make booking easier next time!</span>
            <Button 
              onClick={() => navigate('/explore/artists')}
              className="rounded-full px-6"
            >
              Find Artists
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Heart className="h-6 w-6 text-pink-500" />
        Your Favorite Artists
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.slice(0, 4).map((artist) => (
          <FavoriteArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
