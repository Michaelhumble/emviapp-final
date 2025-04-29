
import React from 'react';
import { MapPin, Star, Building } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Salon } from '@/types/salon';
import { isNailSalon, getNailSalonImage } from '@/utils/nailSalonImages';
import { isBarberShop, getBarberShopImage } from '@/utils/barberShopImages';
import { isHairSalon, getHairSalonImage } from '@/utils/hairSalonImages';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface SalonCardProps {
  salon: Salon;
  isExpired?: boolean;
  onViewDetails: () => void;
}

const SalonCard = ({ salon, isExpired = false, onViewDetails }: SalonCardProps) => {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salon.price);

  // Check if this is a barbershop first (prioritize barber category for our test)
  const isBarber = isBarberShop(salon.name, salon.description);
  // Check if this is a hair salon
  const isHair = !isBarber && isHairSalon(salon.name, salon.description);
  // Then check if this is a nail salon 
  const isNail = !isBarber && !isHair && isNailSalon(salon.name, salon.description);
  
  // Get the appropriate image for this salon
  const salonImage = isBarber
    ? getBarberShopImage(salon.isPremium, salon.featured)
    : isHair
      ? getHairSalonImage(salon.isPremium, salon.featured)
      : isNail 
        ? getNailSalonImage(salon.is_vietnamese_listing, salon.isPremium, salon.featured) 
        : '';

  // IMPORTANT: Store the selected image URL in the salon object so it can be accessed in detail view
  if ((isBarber || isHair || isNail) && salonImage) {
    salon.imageUrl = salonImage;
  }

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow ${isExpired ? 'opacity-75' : ''}`}>
      {/* Image section - Use our high-quality salon images when appropriate */}
      <div className="relative">
        {isBarber || isHair || isNail ? (
          <div className="aspect-[16/9] overflow-hidden">
            <ImageWithFallback
              src={salonImage}
              alt={salon.name || (isBarber ? "Barbershop" : isHair ? "Hair Salon" : "Nail Salon")}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
            <Building className="h-12 w-12 text-gray-200" />
          </div>
        )}
        
        {/* Featured badge */}
        {salon.featured && (
          <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Featured
          </Badge>
        )}
        
        {/* Price tag */}
        <div className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-md font-semibold text-purple-800 shadow-sm">
          {formattedPrice}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">{salon.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{salon.location}</span>
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-4 min-h-[3rem]">
          {salon.description}
        </p>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SalonCard;
