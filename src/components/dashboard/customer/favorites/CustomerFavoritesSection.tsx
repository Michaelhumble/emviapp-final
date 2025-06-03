
import React from "react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import FavoriteCard from "./FavoriteCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

interface CustomerFavoritesSectionProps {
  favorites?: any[];
}

const CustomerFavoritesSection: React.FC<CustomerFavoritesSectionProps> = ({ favorites: propFavorites }) => {
  const { favorites: hookFavorites, loading } = useCustomerDashboard();
  const navigate = useNavigate();
  
  // Use props if provided, otherwise fall back to hook data
  const favorites = propFavorites || hookFavorites;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Heart className="h-6 w-6 text-pink-500" />
        Your Favorites
      </h2>
      
      {loading ? (
        <div className="flex gap-4 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-48 h-36 p-4 flex items-center justify-center bg-pink-50/50">
              <Heart className="animate-pulse text-pink-200 h-8 w-8" />
            </Card>
          ))}
        </div>
      ) : !favorites || favorites.length === 0 ? (
        <Card className="bg-gradient-to-r from-pink-50 to-pink-100/30 border-pink-100">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <Heart className="h-10 w-10 text-pink-300 mb-3 animate-pulse" />
            <p className="text-gray-700 mb-2 font-medium text-lg">You haven't saved any favorites yet.</p>
            <span className="text-gray-500 mb-5">Explore salons and artists to start!</span>
            <Button 
              onClick={() => navigate('/explore/artists')}
              className="rounded-full px-6 bg-purple-600 hover:bg-purple-700"
            >
              Explore Artists
            </Button>
          </CardContent>
        </Card>
      ) : isMobile ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {favorites.map((fav) => (
            <div key={fav.id} className="min-w-[230px] snap-start">
              <FavoriteCard favorite={fav} mobile />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} favorite={fav} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerFavoritesSection;
