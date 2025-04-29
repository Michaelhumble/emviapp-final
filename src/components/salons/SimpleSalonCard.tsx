
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Salon } from '@/types/salon';
import AuthAction from '@/components/common/AuthAction';
import { useAuth } from '@/context/auth';
import { isNailSalon, getNailSalonImage } from '@/utils/nailSalonImages';
import { isBarberShop, getBarberShopImage } from '@/utils/barberShopImages';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface SalonCardProps {
  salon: Salon;
}

/**
 * Component for displaying a salon card in the listings page
 */
const SimpleSalonCard = ({ salon }: SalonCardProps) => {
  const { isSignedIn } = useAuth();
  
  const formatPrice = (price: number) => {
    if (price === 0) return "Giá thương lượng";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Use Vietnamese content when available
  const title = salon.vietnamese_title || salon.name;
  const description = salon.vietnamese_description || salon.description;
  const buttonText = salon.is_vietnamese_listing ? "Xem Chi Tiết" : "View Details";
  const isVietnamese = salon.is_vietnamese_listing;

  // Check if this is a barbershop first (prioritize barber category)
  const isBarber = isBarberShop(salon.name, salon.description);
  // Then check if this is a nail salon
  const isNail = !isBarber && isNailSalon(salon.name, salon.description);
  
  // Get the appropriate image for this salon
  let salonImage;
  if (isBarber) {
    salonImage = getBarberShopImage(salon.isPremium, salon.isPremium);
  } else if (isNail) {
    salonImage = getNailSalonImage(isVietnamese, salon.isPremium, salon.isPremium);
  }

  // IMPORTANT: Store the selected image URL in the salon object so it can be accessed in detail view
  if ((isBarber || isNail) && salonImage) {
    salon.imageUrl = salonImage;
  }

  const handleViewContact = async () => {
    return true; // This will trigger the auth redirect
  };

  return (
    <Card className={`overflow-hidden group transition-shadow duration-300 ${isBarber ? 'hover:shadow-slate-200 shadow-sm border-slate-100' : isVietnamese ? 'hover:shadow-purple-100 shadow-sm border-purple-100' : 'hover:shadow-md'}`}>
      <div className="relative">
        {isBarber ? (
          <div className="h-48 overflow-hidden">
            <ImageWithFallback
              src={salonImage}
              alt={title || "Barbershop"}
              className="h-full w-full object-cover"
              priority={true}
            />
          </div>
        ) : isNail ? (
          <div className="h-48 overflow-hidden">
            <ImageWithFallback
              src={salonImage}
              alt={title || "Nail Salon"}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <Building className="h-14 w-14 text-gray-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {isBarber && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-slate-600 hover:bg-slate-700 text-white">Barbershop</Badge>
          </div>
        )}
        {isVietnamese && !isBarber && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Tiệm Nail</Badge>
          </div>
        )}
      </div>
      
      <CardContent className={`p-5 ${isVietnamese ? 'bg-gradient-to-br from-white to-purple-50' : ''}`}>
        <h3 className="font-playfair text-lg font-semibold mb-2 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{salon.location}</span>
        </div>
        
        <div className="flex items-center text-gray-800 font-medium mb-2">
          <DollarSign className="h-4 w-4 mr-0.5 text-green-600" />
          <span>{formatPrice(salon.price)}</span>
        </div>

        {salon.square_feet && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <Building className="h-4 w-4 mr-1" />
            <span>{salon.square_feet.toLocaleString()} sqft</span>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-3">
            {description}
          </p>
        </div>

        {salon.contact_info?.phone && (
          <AuthAction 
            onAction={handleViewContact} 
            redirectPath={`/salons/${salon.id}`}
            authenticatedContent={
              <div className={`text-sm py-2 px-3 rounded border mb-4 flex items-center gap-2 ${isVietnamese ? 'bg-purple-50 border-purple-200 text-purple-900' : isBarber ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                <Phone className="h-4 w-4" />
                <span>{salon.contact_info.phone}</span>
              </div>
            }
            fallbackContent={
              <div className={`text-sm py-2 px-3 rounded border mb-4 flex items-center gap-2 cursor-pointer ${isVietnamese ? 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100' : isBarber ? 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100' : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}`}>
                <Phone className="h-4 w-4" />
                <span>{isVietnamese ? "Đăng nhập để xem liên hệ" : "Sign in to view contact"}</span>
              </div>
            }
          />
        )}

        <Link to={`/salons/${salon.id}`}>
          <Button 
            className={`w-full ${isBarber ? 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950' : isVietnamese ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white`}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SimpleSalonCard;
