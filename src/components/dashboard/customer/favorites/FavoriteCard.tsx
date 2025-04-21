
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Scissors, Calendar } from "lucide-react";
import { CustomerFavorite } from "@/hooks/useCustomerDashboard";
import { useNavigate } from "react-router-dom";

interface FavoriteCardProps {
  favorite: CustomerFavorite;
  mobile?: boolean;
}

const getInitials = (name: string = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

const FavoriteCard = ({ favorite, mobile = false }: FavoriteCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (favorite.type === "artist") {
      navigate(`/artists/${favorite.id}`);
    } else {
      navigate(`/salons/${favorite.id}`);
    }
  };

  const handleBooking = () => {
    // /booking?provider works for both artist/salon for now
    navigate(`/booking?provider=${favorite.id}`);
  };

  // Responsive padding & size
  const cardPadding = mobile ? "p-4" : "p-5";
  const cardRadius = mobile ? "rounded-xl" : "rounded-2xl";
  const cardShadow = "shadow-md hover:shadow-lg transition-shadow bg-white";

  // Button minimum tap area for mobile
  const btnClass = `min-h-[44px] ${mobile ? "w-full text-base py-2.5" : "w-full text-sm"}`;

  // Fallback for city, state/location
  const locationText =
    favorite.location ||
    (favorite.type === "salon" ? "Salon" : "Unknown location");

  return (
    <Card
      className={`flex flex-col h-full ${cardPadding} ${cardRadius} ${cardShadow} animate-fade-in`}
      style={{ minHeight: mobile ? 130 : 180 }}
      tabIndex={0}
    >
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex items-center gap-4 mb-2">
          <Avatar className="h-14 w-14 border border-gray-200">
            <AvatarImage
              src={favorite.avatar_url || ""}
              alt={favorite.name}
            />
            <AvatarFallback className="bg-pink-50 text-pink-400 text-lg">
              {getInitials(favorite.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-base md:text-lg truncate mb-0.5"
              title={favorite.name}
            >
              {favorite.name}
            </h3>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              {favorite.type === "artist" ? (
                <>
                  <Scissors className="h-4 w-4" />
                  {favorite.specialty || "Artist"}
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  {locationText}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="pt-2 grid grid-cols-2 gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            className={btnClass}
            onClick={handleViewProfile}
            aria-label={`View ${favorite.name} profile`}
          >
            View Profile
          </Button>
          <Button
            size="sm"
            className={`${btnClass} bg-pink-100 text-pink-700 hover:bg-pink-200`}
            onClick={handleBooking}
            aria-label={`Book again with ${favorite.name}`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Book Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
