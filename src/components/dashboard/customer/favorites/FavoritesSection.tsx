
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import FavoriteCard from "./FavoriteCard";
import React from "react";

// Simple mobile breakpoint
function useIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

const FavoritesSection = () => {
  const { favorites, loading } = useCustomerDashboard();
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Animate cards in with fade-in and slight upward motion
  const animationClass = "animate-fade-in";

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Heart className="text-pink-400 h-6 w-6" /> Your Favorites
      </h2>
      {loading ? (
        <div className={isMobile ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-full mt-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !favorites || favorites.length === 0 ? (
        <Card className="w-full animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Heart className="h-10 w-10 text-pink-300 mb-4 animate-bounce" />
            <p className="text-gray-500 mb-2 font-medium">You haven’t added any favorites yet.</p>
            <span className="text-sm text-gray-400 mb-6">Tap the <span className="font-bold text-pink-400">❤️</span> icon on a salon or artist to save them here.</span>
            <Button 
              onClick={() => navigate('/explore/artists')}
              className="h-11 px-6"
            >
              Explore Artists
            </Button>
          </CardContent>
        </Card>
      ) : isMobile ? (
        <div className="flex flex-col gap-4">
          {favorites.map((favorite, idx) => (
            <div key={favorite.id} className={`${animationClass} will-change-transform`} style={{ animationDelay: `${idx * 80}ms` }}>
              <FavoriteCard favorite={favorite} mobile />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((favorite, idx) => (
            <div
              key={favorite.id}
              className={`${animationClass} hover-scale will-change-transform`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <FavoriteCard favorite={favorite} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesSection;
