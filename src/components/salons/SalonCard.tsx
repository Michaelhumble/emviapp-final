
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Salon } from '@/types/salon';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { getDefaultSalonImage, getLuxurySalonImage } from '@/utils/salonImageFallbacks';

interface SalonCardProps {
  salon: Salon;
  isExpired?: boolean;
  onViewDetails: () => void;
}

const SalonCard = ({ salon, isExpired = false, onViewDetails }: SalonCardProps) => {
  // Use correct image property based on what's available
  const imageUrl = salon.imageUrl || salon.image || '';
  
  // Determine appropriate salon category for fallback image
  const salonCategory = salon.category || (
    salon.isPremium ? 'luxury' : 
    salon.specialty?.toLowerCase().includes('nail') ? 'nail' :
    salon.specialty?.toLowerCase().includes('hair') ? 'hair' :
    salon.specialty?.toLowerCase().includes('spa') ? 'spa' :
    salon.specialty?.toLowerCase().includes('barber') ? 'barber' :
    'beauty'
  );
  
  // For premium salons, use luxury images
  const fallbackImage = salon.isPremium ? 
    getLuxurySalonImage() : 
    getDefaultSalonImage(salonCategory);

  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salon.price);

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow ${isExpired ? 'opacity-75' : ''}`}>
      {/* Image */}
      <div className="relative">
        <div className="aspect-[16/9] bg-gray-200">
          <ImageWithFallback
            src={imageUrl}
            alt={salon.name}
            fallbackImage={fallbackImage}
            className="w-full h-full"
            objectFit="cover"
            showPremiumBadge={salon.isPremium}
          />
        </div>
        
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
