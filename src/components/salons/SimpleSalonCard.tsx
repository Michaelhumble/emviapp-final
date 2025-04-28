
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building, Phone } from "lucide-react";
import { Salon } from '@/types/salon';
import { Badge } from "@/components/ui/badge";

interface SalonCardProps {
  salon: Salon;
}

const SimpleSalonCard = ({ salon }: SalonCardProps) => {
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

  return (
    <Card className={`overflow-hidden group transition-shadow duration-300 ${isVietnamese ? 'hover:shadow-purple-100 shadow-sm border-purple-100' : 'hover:shadow-md'}`}>
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${salon.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {isVietnamese && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">🇻🇳 Tiệm Nail</Badge>
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

        {salon.features && salon.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {salon.features.slice(0, 3).map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`text-xs ${isVietnamese ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {feature}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-3">
            {description}
          </p>
        </div>

        {salon.contact_info?.phone && (
          <div className={`text-sm py-2 px-3 rounded border mb-4 flex items-center gap-2 ${isVietnamese ? 'bg-purple-50 border-purple-200 text-purple-900' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
            <Phone className="h-4 w-4" />
            {salon.contact_info.phone}
            {salon.contact_info.owner_name && ` (${salon.contact_info.owner_name})`}
          </div>
        )}

        <Link to={`/salons/${salon.id}`}>
          <Button 
            className={`w-full ${isVietnamese ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'} text-white`}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SimpleSalonCard;
