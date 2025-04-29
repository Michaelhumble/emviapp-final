
import React from 'react';
import { MapPin, Star, Building } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Salon } from '@/types/salon';
import { isNailSalon, NAIL_SALON_IMAGES } from '@/utils/nailSalonImages';
import { isBarberShop, getBarberShopImage } from '@/utils/barberShopImages';
import { isHairSalon, getHairSalonImage, isLuxuryHairSalon } from '@/utils/hairSalonImages';
import { isLashSalon, isBrowSalon, getLashSalonImage, getBrowSalonImage, isLuxuryLashStudio } from '@/utils/lashBrowSalonImages';
import { isMassageSpa, getMassageSalonImage, isLuxuryMassageSpa } from '@/utils/massageSalonImages';
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

  // IMPORTANT: Check if this is specifically a nail salon first (prioritize nail category for user's requested emphasis)
  const isNail = isNailSalon(salon.name, salon.description);
  
  // Check if this is a barbershop (only if not a nail salon)
  const isBarber = !isNail && isBarberShop(salon.name, salon.description);
  
  // Check if this is a hair salon (only if not a nail salon or barbershop)
  const isHair = !isNail && !isBarber && isHairSalon(salon.name, salon.description);
  
  // Check if this is specifically a luxury hair salon
  const isLuxuryHair = isHair && isLuxuryHairSalon(salon.name, salon.description);
  
  // Check if this is a lash salon (only if not a nail salon, barbershop, or hair salon)
  const isLash = !isNail && !isBarber && !isHair && isLashSalon(salon.name, salon.description);
  
  // Check if this is specifically a luxury lash salon
  const isLuxuryLash = isLash && isLuxuryLashStudio(salon.name, salon.description);
  
  // Check if this is a brow salon (only if not a nail salon, barbershop, hair salon, or lash salon)
  const isBrow = !isNail && !isBarber && !isHair && !isLash && isBrowSalon(salon.name, salon.description);
  
  // Check if this is a massage/spa (only if not a nail salon, barbershop, hair salon, lash salon, or brow salon)
  const isMassage = !isNail && !isBarber && !isHair && !isLash && !isBrow && isMassageSpa(salon.name, salon.description);
  
  // Check if this is a luxury massage/spa
  const isLuxuryMassage = isMassage && isLuxuryMassageSpa(salon.name, salon.description);
  
  // Get the appropriate image for this salon
  let salonImage;
  
  // First priority: nail salons
  if (isNail) {
    // For premium/luxury nail salons
    if (salon.isPremium || salon.featured) {
      salonImage = salon.price > 200000 ? NAIL_SALON_IMAGES.luxuryLarge : NAIL_SALON_IMAGES.modernDeluxe;
    } else {
      // For standard nail salons, pick from a rotating selection of updated images
      const nailImagesArray = [
        NAIL_SALON_IMAGES.artGallery,
        NAIL_SALON_IMAGES.executiveNails,
        NAIL_SALON_IMAGES.minimalist
      ];
      salonImage = nailImagesArray[Math.floor(Math.random() * nailImagesArray.length)];
    }
  } 
  // Then handle other salon types
  else if (isBarber) {
    salonImage = getBarberShopImage(salon.isPremium, salon.featured);
  } else if (isHair) {
    salonImage = getHairSalonImage(isLuxuryHair, salon.isPremium || salon.featured);
  } else if (isLash) {
    salonImage = getLashSalonImage(isLuxuryLash || salon.isPremium || salon.featured);
  } else if (isBrow) {
    salonImage = getBrowSalonImage(salon.isPremium || salon.featured);
  } else if (isMassage) {
    salonImage = getMassageSalonImage(isLuxuryMassage || salon.isPremium || salon.featured);
  }

  // Store the selected image URL in the salon object so it can be accessed in detail view
  if ((isNail || isBarber || isHair || isLash || isBrow || isMassage) && salonImage) {
    salon.imageUrl = salonImage;
  }

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow ${isExpired ? 'opacity-75' : ''}`}>
      {/* Image section - Use our high-quality salon images when appropriate */}
      <div className="relative">
        {isNail || isBarber || isHair || isLash || isBrow || isMassage ? (
          <div className="aspect-[16/9] overflow-hidden">
            <ImageWithFallback
              src={salonImage}
              alt={salon.name || (
                isNail ? "Nail Salon" :
                isBarber ? "Barbershop" : 
                isHair ? "Hair Salon" : 
                isLash ? "Lash Studio" : 
                isBrow ? "Brow Studio" :
                isMassage ? "Massage & Spa" : 
                "Beauty Salon"
              )}
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
        
        {/* Luxury badge for high-end nail salons */}
        {isNail && (salon.isPremium || salon.featured) && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Luxury
          </Badge>
        )}
        
        {/* Luxury badge for high-end hair salons */}
        {isLuxuryHair && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Luxury
          </Badge>
        )}
        
        {/* Luxury badge for premium lash studios */}
        {isLuxuryLash && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Premium
          </Badge>
        )}
        
        {/* Luxury badge for premium massage spas */}
        {isLuxuryMassage && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white">
            <Star className="h-3 w-3 mr-1 fill-white" />
            Wellness
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
          variant={isLuxuryHair || isLuxuryLash || isLuxuryMassage ? "default" : "outline"}
          className={isNail && (salon.isPremium || salon.featured)
            ? "w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white" 
            : isLuxuryHair 
              ? "w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white" 
              : isLuxuryLash
                ? "w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white"
                : isLuxuryMassage
                  ? "w-full bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white"
                  : "w-full"}
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SalonCard;
