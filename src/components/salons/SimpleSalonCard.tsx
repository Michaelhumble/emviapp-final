
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building } from "lucide-react";
import { Salon } from '@/types/salon';
import { Badge } from "@/components/ui/badge";

interface SalonCardProps {
  salon: Salon;
}

const SimpleSalonCard = ({ salon }: SalonCardProps) => {
  const formatPrice = (price: number) => {
    if (price === 0) return "Contact for Price";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${salon.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-playfair text-lg font-semibold mb-2 line-clamp-1">
          {salon.name}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{salon.location}</span>
        </div>
        
        <div className="flex items-center text-gray-800 font-medium mb-2">
          <DollarSign className="h-4 w-4 mr-0.5 text-green-600" />
          <span>{formatPrice(salon.price)}</span>
        </div>

        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {salon.features.slice(0, 3).map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-purple-50 text-purple-700"
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}

        {salon.square_feet && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <Building className="h-4 w-4 mr-1" />
            <span>{salon.square_feet.toLocaleString()} sqft</span>
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {salon.description}
        </p>

        <Link to={`/salons/${salon.id}`}>
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SimpleSalonCard;
