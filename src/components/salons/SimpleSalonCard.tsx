
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Salon } from '@/types/salon';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';

interface SimpleSalonCardProps {
  salon: Salon;
}

/**
 * A simplified salon card component for displaying salon listings
 * Used in salon grid views on homepage and listings pages
 */
const SimpleSalonCard: React.FC<SimpleSalonCardProps> = ({ salon }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine appropriate salon image
  const getSalonImage = () => {
    // Check if imageUrl exists and is a string
    if (salon.imageUrl && typeof salon.imageUrl === 'string' && salon.imageUrl.indexOf('lovable-uploads') !== -1) {
      return salon.imageUrl;
    }
    
    // Check if image exists and is a string
    if (salon.image && typeof salon.image === 'string' && salon.image.indexOf('lovable-uploads') !== -1) {
      return salon.image;
    }
    
    // Otherwise determine appropriate category and get default image
    const category = salon.category || determineSalonCategory(salon.description || '', salon.name || '');
    return getDefaultSalonImage(category, salon.isPremium || false);
  };
  
  // Get formatted price for display
  const getFormattedPrice = () => {
    // Use the asking_price field if available (for consistency with the Job type)
    if (salon.asking_price) {
      // If already formatted, return as is
      if (typeof salon.asking_price === 'string' && salon.asking_price.includes('$')) {
        return salon.asking_price;
      }
      // Otherwise format it
      return `$${salon.asking_price}`;
    }
    
    // Otherwise use the price field
    if (typeof salon.price === 'number') {
      return `$${salon.price.toLocaleString()}`;
    }
    
    if (typeof salon.price === 'string') {
      if (salon.price && salon.price.includes('$')) {
        return salon.price;
      } else if (salon.price) {
        return `$${salon.price}`;
      }
    }
    
    return 'Contact for Price';
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${isHovered ? 'transform-gpu -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/salons/${salon.id}`} className="block">
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={getSalonImage()}
            alt={salon.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            businessName={salon.name}
            category={salon.category}
            showPremiumBadge={salon.isPremium}
            priority={true}
          />
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{salon.name}</h3>
          {salon.featured && (
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 uppercase text-xs">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-gray-500 my-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{salon.location}</span>
        </div>
        
        <div className="flex items-center font-medium text-emerald-700 mt-3">
          <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{getFormattedPrice()}</span>
        </div>
        
        <Link to={`/salons/${salon.id}`} className="mt-4 text-primary font-medium hover:text-primary/90 text-sm inline-flex items-center">
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
};

export default SimpleSalonCard;
