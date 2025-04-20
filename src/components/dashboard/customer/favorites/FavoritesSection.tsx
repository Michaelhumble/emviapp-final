
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import FavoriteCard from "./FavoriteCard";

const FavoritesSection = () => {
  const { favorites, loading } = useCustomerDashboard();
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
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
    );
  }
  
  if (!favorites || favorites.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-6 text-center">You haven't saved any favorites yet</p>
          <Button 
            onClick={() => navigate('/explore/artists')}
            className="h-11 px-6"
          >
            Explore Artists
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.map((favorite) => (
        <FavoriteCard key={favorite.id} favorite={favorite} />
      ))}
    </div>
  );
};

export default FavoritesSection;
