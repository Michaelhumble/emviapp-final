
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign } from "lucide-react";
import FeatureListingButton from "@/components/sell-salon/FeatureListingButton";

interface SalonSaleCardProps {
  salon: any;
  onViewDetails: (salon: any) => void;
}

const SalonSaleCard = ({ salon, onViewDetails }: SalonSaleCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{salon.salon_name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {salon.city}, {salon.state}
        </div>
        {salon.asking_price && (
          <div className="flex items-center text-green-700 font-medium mb-2">
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            ${typeof salon.asking_price === 'number' ? salon.asking_price.toLocaleString() : salon.asking_price}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(salon)}>
            View Details
          </Button>
          <FeatureListingButton 
            salonId={salon.id}
            currentlyFeatured={salon.is_featured}
            disabled
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonSaleCard;
