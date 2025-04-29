
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Store, Star } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { formatCurrency } from "@/utils/salonSales";
import { FeatureListingButton } from "@/components/sell-salon/FeatureListingButton";
import { useAuth } from "@/context/auth";
import { isNailSalon, getNailSalonImage } from "@/utils/nailSalonImages";
import { isLashSalon, isBrowSalon, getLashSalonImage, getBrowSalonImage } from "@/utils/lashBrowSalonImages";
import { isMassageSpa, getMassageSalonImage } from "@/utils/massageSalonImages";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

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
  
  // Check if this is a lash salon or studio
  const isLash = isLashSalon(salon.salon_name || '', salon.description || '');
  
  // Check if this is a brow salon or studio
  const isBrow = !isLash && isBrowSalon(salon.salon_name || '', salon.description || '');
  
  // NEW: Check if this is a massage salon or spa
  const isMassage = !isLash && !isBrow && isMassageSpa(salon.salon_name || '', salon.description || '');
  
  // Fallback check for nail salon
  const isNail = !isLash && !isBrow && !isMassage && isNailSalon(salon.salon_name || '', salon.description || '');
  
  // Get appropriate image for the salon type
  let salonImage = '';
  if (isLash) {
    salonImage = getLashSalonImage(salon.is_featured);
  } else if (isBrow) {
    salonImage = getBrowSalonImage(salon.is_featured);
  } else if (isMassage) {
    salonImage = getMassageSalonImage(salon.is_featured);
  } else if (isNail) { 
    salonImage = getNailSalonImage(false, salon.is_featured, salon.is_featured);
  }
  
  const getBusinessTypeIcon = (type?: string) => {
    switch (type) {
      case "Nails":
        return <Store className="h-4 w-4" />;
      case "Hair":
        return <Store className="h-4 w-4" />;
      case "Lashes":
      case "Lash":
        return <Store className="h-4 w-4" />;
      case "Brows":
      case "Brow":
        return <Store className="h-4 w-4" />;
      case "Spa":
      case "Massage":
        return <Store className="h-4 w-4" />;
      case "Barbershop":
        return <Store className="h-4 w-4" />;
      default:
        return <Store className="h-4 w-4" />;
    }
  };

  const isActive = salon.status === 'active';

  return (
    <Card 
      className={`overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col ${
        salon.is_urgent ? "border-amber-400" : ""
      } ${
        salon.is_featured ? "border-2 border-amber-300 bg-amber-50" : ""
      }`}
    >
      <div className="aspect-video relative">
        {isLash || isBrow || isMassage || isNail ? (
          <ImageWithFallback
            src={salonImage}
            alt={salon.salon_name || (
              isLash ? "Lash Studio" : 
              isBrow ? "Brow Studio" :
              isMassage ? "Massage & Spa" :
              "Nail Salon"
            )}
            className="h-full w-full object-cover"
            priority={true}
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <Store className="h-12 w-12 text-gray-200" />
          </div>
        )}
        
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
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">
          {salon.salon_name || "Salon for sale"}
        </h3>
        <div className="flex items-center text-gray-500 mb-1">
          <MapPin className="h-4 w-4 mr-1 shrink-0" />
          <span className="text-sm truncate">
            {salon.city}{salon.state ? `, ${salon.state}` : ''}
          </span>
        </div>
        <div className="flex items-center text-gray-500 mb-3">
          {getBusinessTypeIcon(salon.business_type)}
          <span className="text-sm ml-1">{salon.business_type || 'Salon'}</span>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="h-4 w-4 shrink-0" />
            {formatCurrency(salon.asking_price)}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(salon)}
            className="min-h-[38px] min-w-[100px]"
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
