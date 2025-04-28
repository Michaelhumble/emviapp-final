
import React from 'react';
import { MapPin, DollarSign, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";

interface SalonCardProps {
  salon: Job;
  index?: number;
  isExpired?: boolean;
  onViewDetails?: () => void;
  onClick?: () => void;
}

const SalonCard = ({ salon, isExpired, onClick, onViewDetails }: SalonCardProps) => {
  // Determine features to display as tags
  const getFeatureTags = () => {
    const tags = [];
    
    if (salon.has_wax_room) {
      tags.push("Wax Room");
    }
    
    if (salon.owner_will_train) {
      tags.push("Owner Will Train");
    }
    
    if (salon.has_housing) {
      tags.push("Housing Available");
    }
    
    // Add salon-specific features
    if (salon.salon_features && Array.isArray(salon.salon_features)) {
      const priorityFeatures = ["High Traffic", "Equipment Included", "Prime Location", "Parking Available"];
      
      priorityFeatures.forEach(feature => {
        if (salon.salon_features?.some(f => f.toLowerCase().includes(feature.toLowerCase())) && 
            tags.length < 3) {
          tags.push(feature);
        }
      });
    }
    
    return tags.slice(0, 3); // Limit to 3 tags
  };

  // Generate a hot deal tag if the price seems competitive
  const isHotDeal = () => {
    if (!salon.asking_price) return false;
    const price = parseFloat(salon.asking_price.replace(/[^0-9.-]+/g, ""));
    // Consider it a hot deal if under $40k or has a compelling feature set
    return price < 40000 || 
           (salon.salon_features && salon.salon_features.length > 4);
  };

  // Handle the click event
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onViewDetails) {
      onViewDetails();
    }
  };

  // Format price to currency
  const formatPrice = (price: string | undefined) => {
    if (!price) return "$0";
    
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(numericPrice);
  };

  const tags = getFeatureTags();

  return (
    <div 
      className={`group rounded-xl overflow-hidden border ${isExpired ? 'border-gray-200 opacity-70' : 'border-gray-200'} bg-white shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ 
          backgroundImage: `url(${salon.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80'})`,
          backgroundPosition: 'center center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-3 left-3">
            <div className="flex gap-2">
              {isHotDeal() && (
                <Badge className="bg-amber-500 text-white text-xs px-2 py-1 font-medium">Hot Deal</Badge>
              )}
              
              {salon.is_featured && (
                <Badge className="bg-purple-600 text-white text-xs px-2 py-1 font-medium">Featured</Badge>
              )}
              
              {isExpired && (
                <Badge variant="outline" className="bg-gray-600/70 text-white border-none text-xs px-2">Expired</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-playfair text-lg font-semibold mb-1 line-clamp-1">
            {salon.company || salon.title || "Salon For Sale"}
          </h3>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{salon.location}</span>
          </div>
          
          <div className="flex items-center text-gray-800 font-medium">
            <DollarSign className="h-4 w-4 mr-0.5 text-green-600" /> 
            <span>{formatPrice(salon.asking_price)}</span>
          </div>
        </div>
        
        {/* Features Tags */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {salon.description || "Beautiful salon space available for immediate sale. Contact for details."}
        </p>
        
        <Button 
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium group transition-all"
          disabled={isExpired}
        >
          View Details
          <svg 
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default SalonCard;
