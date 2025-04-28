
import React from 'react';
import { MapPin, DollarSign, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Salon } from '@/types/salon';

interface SalonCardProps {
  salon: Salon;
  isExpired?: boolean;
  onViewDetails: () => void;
}

const SalonCard = ({ salon, isExpired = false, onViewDetails }: SalonCardProps) => {
  // Use correct image property based on what's available
  const imageUrl = salon.imageUrl || salon.image || '';

  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salon.price);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative">
        <div className="aspect-[16/9] bg-gray-200">
          <img
            src={imageUrl}
            alt={salon.name}
            className="w-full h-full object-cover"
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
