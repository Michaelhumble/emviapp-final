
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SalonCardProps {
  salon: any;
  onClick?: () => void;
  index?: number;
  isExpired?: boolean;
  onViewDetails?: () => void;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, onClick, onViewDetails, index, isExpired }) => {
  const formatPrice = (price: string) => {
    if (!price) return 'Contact for price';
    
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return price;
    
    return formatCurrency(numericPrice);
  };
  
  const displayImage = salon.image || 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60';
  const displayName = salon.company || salon.name || 'Unnamed Salon';

  // Use either onClick or onViewDetails, preferring onClick for backward compatibility
  const handleClick = onClick || onViewDetails;

  return (
    <Card className={cn(
      "overflow-hidden hover:shadow-md transition-shadow border-gray-200",
      isExpired && "opacity-70"
    )}>
      <CardContent className="p-0">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${displayImage})` }}
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{displayName}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" /> {salon.location}
          </div>
          
          {salon.for_sale && (
            <div className="flex items-center text-sm text-purple-600 mb-3">
              <span className="font-semibold">
                {formatPrice(salon.asking_price)}
              </span>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {salon.description?.substring(0, 120)}
            {salon.description && salon.description.length > 120 ? '...' : ''}
          </p>
          
          <Button 
            onClick={handleClick} 
            variant="outline" 
            className="w-full"
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
