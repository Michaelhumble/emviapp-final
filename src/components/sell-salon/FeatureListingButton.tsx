
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { SalonListing } from '@/types/salon';

// Stub component for FeatureListingButton
interface FeatureListingButtonProps {
  salonId: string;
  currentlyFeatured?: boolean;
  onFeature?: (salonId: string) => void;
  disabled?: boolean;
}

const FeatureListingButton = ({ 
  salonId, 
  currentlyFeatured = false,
  onFeature,
  disabled = false
}: FeatureListingButtonProps) => {
  const handleClick = () => {
    if (onFeature) onFeature(salonId);
  };
  
  return (
    <Button 
      variant={currentlyFeatured ? "default" : "outline"}
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      className="flex items-center gap-1"
    >
      <Star className={`h-4 w-4 ${currentlyFeatured ? 'fill-current' : ''}`} />
      {currentlyFeatured ? 'Featured' : 'Feature Listing'}
    </Button>
  );
};

export default FeatureListingButton;
