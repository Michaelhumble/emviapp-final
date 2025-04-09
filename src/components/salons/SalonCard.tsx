
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar, Home, Sparkles } from "lucide-react";
import { differenceInDays } from 'date-fns';

interface SalonCardProps {
  salon: any;
  onViewDetails: (salon: any) => void;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, onViewDetails }) => {
  const isExpired = () => {
    if (salon.status === 'expired') return true;
    
    const createdDate = new Date(salon.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };
  
  const expired = isExpired();
  const daysAgo = differenceInDays(new Date(), new Date(salon.created_at));

  // Default fallback image if salon doesn't have one
  const fallbackImage = 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={`overflow-hidden transition-all hover:shadow-md border ${expired ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100'}`}>
        {expired && (
          <div className="bg-orange-100 border-b border-orange-200 p-2 text-center">
            <p className="text-orange-800 text-xs font-medium">
              This listing has expired
            </p>
          </div>
        )}
        
        <div 
          className="h-48 bg-center bg-cover relative" 
          style={{ 
            backgroundImage: salon.image ? 
              `url(${salon.image})` : 
              `url(${fallbackImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white flex justify-between w-full items-end">
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-1.5 px-3">
                {salon.asking_price}
              </Badge>
              
              {salon.is_featured && (
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-1">{salon.company || salon.salon_name || 'Unnamed Salon'}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" /> {salon.location}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-3.5 w-3.5 mr-1" /> 
              Rent: {salon.monthly_rent}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {daysAgo} days ago
            </div>
          </div>
          
          {salon.vietnamese_description && (
            <p className="text-sm text-gray-600 italic mb-2 line-clamp-2">
              {salon.vietnamese_description}
            </p>
          )}
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {salon.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {salon.has_housing && (
              <Badge variant="outline" className="bg-green-50 text-green-800 text-xs">
                <Home className="h-3 w-3 mr-1" /> Housing
              </Badge>
            )}
            {salon.salon_features?.slice(0, 3).map((feature: string, i: number) => (
              <Badge key={i} variant="outline" className="bg-blue-50 text-blue-800 text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          <Button 
            size="sm" 
            variant="default" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={() => onViewDetails(salon)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonCard;
