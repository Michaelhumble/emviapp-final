
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Scissors, Calendar } from "lucide-react";
import { CustomerFavorite } from "@/hooks/useCustomerDashboard";

interface FavoriteCardProps {
  favorite: CustomerFavorite;
}

const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    if (favorite.type === 'artist') {
      navigate(`/artists/${favorite.id}`);
    } else {
      navigate(`/salons/${favorite.id}`);
    }
  };
  
  const handleBooking = () => {
    navigate(`/booking?provider=${favorite.id}`);
  };
  
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-3">
          <Avatar className="h-12 w-12 border border-gray-200">
            <AvatarImage 
              src={favorite.avatar_url || ''}
              alt={favorite.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {favorite.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium">{favorite.name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {favorite.type === 'artist' ? (
                <>
                  <Scissors className="h-3 w-3" />
                  {favorite.specialty || 'Artist'}
                </>
              ) : (
                <>
                  <MapPin className="h-3 w-3" />
                  {favorite.location || 'Salon'}
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
          
          <Button
            size="sm"
            className="w-full"
            onClick={handleBooking}
          >
            <Calendar className="h-3 w-3 mr-1" />
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
