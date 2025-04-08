
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Store, Star } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { formatCurrency } from "@/utils/salonSales";
import { FeatureListingButton } from "@/components/sell-salon/FeatureListingButton";
import { useAuth } from "@/context/auth";

interface SalonSaleCardProps {
  salon: SalonSale;
  onViewDetails: (salon: SalonSale) => void;
  showFeatureButton?: boolean;
  onFeatureSuccess?: () => void;
}

export const SalonSaleCard = ({ 
  salon, 
  onViewDetails, 
  showFeatureButton = false,
  onFeatureSuccess
}: SalonSaleCardProps) => {
  const { user } = useAuth();
  const isOwner = user?.id === salon.user_id;
  
  const getBusinessTypeIcon = (type?: string) => {
    switch (type) {
      case "Nails":
        return <Store className="h-4 w-4" />;
      case "Hair":
        return <Store className="h-4 w-4" />;
      case "Spa":
        return <Store className="h-4 w-4" />;
      case "Barbershop":
        return <Store className="h-4 w-4" />;
      default:
        return <Store className="h-4 w-4" />;
    }
  };

  const isActive = salon.status === 'active';
  
  // Safely get thumbnail image URL
  const getThumbnailUrl = () => {
    if (salon.photos && Array.isArray(salon.photos) && salon.photos.length > 0) {
      return salon.photos[0].photo_url;
    }
    return "https://placehold.co/600x400/e2e8f0/64748b?text=Salon+Image";
  };

  return (
    <Card 
      className={`overflow-hidden transition-shadow hover:shadow-md ${
        salon.is_urgent ? "border-amber-400" : ""
      } ${
        salon.is_featured ? "border-2 border-amber-300 bg-amber-50" : ""
      }`}
    >
      <div className="aspect-video bg-gray-200 relative">
        {!isActive && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white px-3 py-1 rounded-md text-gray-800 font-medium text-sm">
              Inactive Listing
            </div>
          </div>
        )}
        {salon.is_urgent && (
          <div className="absolute top-2 right-2 bg-amber-400 text-white py-1 px-2 rounded-md text-xs font-medium z-20">
            Urgent
          </div>
        )}
        {salon.is_featured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900 py-1 px-2 rounded-md text-xs font-medium flex items-center shadow-sm z-20">
            <Star className="h-3 w-3 mr-1 fill-amber-900" /> Featured
          </div>
        )}
        <img
          src={getThumbnailUrl()}
          alt={salon.salon_name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">
          {salon.salon_name}
        </h3>
        <div className="flex items-center text-gray-500 mb-1">
          <MapPin className="h-4 w-4 mr-1 shrink-0" />
          <span className="text-sm truncate">
            {salon.city}, {salon.state}
          </span>
        </div>
        <div className="flex items-center text-gray-500 mb-3">
          {getBusinessTypeIcon(salon.business_type)}
          <span className="text-sm ml-1">{salon.business_type || 'Salon'}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="h-4 w-4 shrink-0" />
            {formatCurrency(salon.asking_price)}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(salon)}
          >
            View Details
          </Button>
        </div>
        
        {showFeatureButton && isOwner && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <FeatureListingButton 
              salonSaleId={salon.id} 
              isFeatured={salon.is_featured || false}
              onFeatureSuccess={onFeatureSuccess}
              isOwner={true}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
