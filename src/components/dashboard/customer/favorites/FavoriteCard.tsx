
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomerFavorite } from "@/hooks/useCustomerDashboard";
import { MapPin, Calendar, Heart } from "lucide-react";

interface FavoriteCardProps {
  favorite: CustomerFavorite;
  mobile?: boolean;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, mobile = false }) => {
  return (
    <Card className="h-full hover:shadow-md transition-all overflow-hidden border-pink-100">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 h-24 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {favorite.avatar_url ? (
            <img 
              src={favorite.avatar_url} 
              alt={favorite.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
              <span className="text-xl font-medium text-purple-600">
                {favorite.name?.[0].toUpperCase() || 'A'}
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg text-gray-800 mb-0.5 truncate">{favorite.name}</h3>
        
        {favorite.specialty && (
          <p className="text-gray-500 text-sm mb-3">{favorite.specialty}</p>
        )}
        
        {favorite.location && (
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{favorite.location}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs"
          >
            <Calendar className="h-3.5 w-3.5 mr-1" /> Book
          </Button>
          <Button 
            size="sm" 
            className="rounded-full flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
