
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Salon } from '@/types/salon';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';
import ValidatedLink from '@/components/common/ValidatedLink';
import { safeGetListingProperty } from '@/components/common/withListingValidation';

interface SimpleSalonCardProps {
  salon: Salon;
}

/**
 * A simplified salon card component for displaying salon listings
 * Used in salon grid views on homepage and listings pages
 */
const SimpleSalonCard: React.FC<SimpleSalonCardProps> = ({ salon }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine appropriate salon image - PRESERVE ORIGINAL IMAGES
  const getSalonImage = () => {
    try {
      // Always prioritize existing valid images - DO NOT OVERWRITE
      if (salon.image && typeof salon.image === 'string' && salon.image.trim() !== '') {
        return salon.image;
      }
      
      if (salon.imageUrl && typeof salon.imageUrl === 'string' && salon.imageUrl.trim() !== '') {
        return salon.imageUrl;
      }
      
      // Only use fallbacks if truly no image is available
      const category = salon.category || determineSalonCategory();
      
      return getDefaultSalonImage(category, salon.isPremium || false);
    } catch (error) {
      console.error('Error getting salon image:', error);
      return getDefaultSalonImage('generic');
    }
  };
  
  // Get formatted price for display with proper type checking
  const getFormattedPrice = (): string => {
    try {
      // First check asking_price (prioritize this field)
      if (salon.asking_price !== undefined && salon.asking_price !== null) {
        // Handle string type
        if (typeof salon.asking_price === 'string') {
          // Check if already has $ symbol using a safe method
          const askingPriceStr: string = salon.asking_price;
          return askingPriceStr.includes('$') ? 
            askingPriceStr : 
            `$${askingPriceStr}`;
        }
        // Handle number type
        else if (typeof salon.asking_price === 'number') {
          return `$${salon.asking_price}`;
        }
      }
      
      // Then check price field if asking_price is not available
      if (salon.price !== undefined && salon.price !== null) {
        // Handle string type
        if (typeof salon.price === 'string') {
          // Check if already has $ symbol using a safe method
          const priceStr: string = salon.price;
          return priceStr.includes('$') ? 
            priceStr : 
            `$${priceStr}`;
        }
        // Handle number type
        else if (typeof salon.price === 'number') {
          const priceNum: number = salon.price;
          return `$${priceNum.toLocaleString()}`;
        }
      }
      
      // Default fallback
      return 'Contact for Price';
    } catch (error) {
      console.error('Error formatting price:', error);
      return 'Contact for Price';
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${isHovered ? 'transform-gpu -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ValidatedLink 
        to={`/salons/${salon.id}`} 
        className="block"
        listingId={salon.id}
        listingType="salon"
      >
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={getSalonImage()}
            alt={salon.name || 'Salon listing'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            businessName={salon.name || 'Salon'}
            category={salon.category}
            showPremiumBadge={salon.isPremium}
            priority={true}
          />
        </div>
      </ValidatedLink>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{salon.name || 'Unnamed Salon'}</h3>
          {salon.featured && (
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 uppercase text-xs">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-gray-500 my-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{salon.location || 'Location unavailable'}</span>
        </div>
        
        <div className="flex items-center font-medium text-emerald-700 mt-3">
          <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{getFormattedPrice()}</span>
        </div>
        
        <ValidatedLink 
          to={`/salons/${salon.id}`} 
          className="mt-4 text-primary font-medium hover:text-primary/90 text-sm inline-flex items-center"
          listingId={salon.id}
          listingType="salon"
        >
          View Details →
        </ValidatedLink>
      </CardContent>
    </Card>
  );
};

export default SimpleSalonCard;
