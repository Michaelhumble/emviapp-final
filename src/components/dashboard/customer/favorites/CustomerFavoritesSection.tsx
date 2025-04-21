
import React from "react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import FavoriteCard from "./FavoriteCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const CustomerFavoritesSection: React.FC = () => {
  const { favorites, loading } = useCustomerDashboard();
  const navigate = useNavigate();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (loading) {
    // Show loading skeletons
    return (
      <div className={isMobile ? "flex gap-3 overflow-x-auto" : "grid grid-cols-2 md:grid-cols-3 gap-4"}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-48 h-36 p-4 flex items-center justify-center">
            <Heart className="animate-pulse text-pink-300 h-8 w-8" />
          </Card>
        ))}
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <Card className="w-full animate-fade-in">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Heart className="h-8 w-8 text-pink-300 mb-2 animate-bounce" />
          <p className="text-gray-500 mb-1 font-medium">You haven’t saved any favorites yet.</p>
          <span className="text-sm text-gray-400 mb-4">Explore salons and artists to start!</span>
          <Button onClick={() => navigate('/explore/artists')}>Explore Artists</Button>
        </CardContent>
      </Card>
    );
  }

  // Responsive: horizontal scroll on mobile, grid on web
  return isMobile ? (
    <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
      {favorites.map((fav) => (
        <div key={fav.id} className="min-w-[220px]">
          <FavoriteCard favorite={fav} mobile />
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {favorites.map((fav) => (
        <FavoriteCard key={fav.id} favorite={fav} />
      ))}
    </div>
  );
};

export default CustomerFavoritesSection;
