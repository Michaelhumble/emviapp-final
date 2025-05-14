
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Job } from '@/types/job';
import { Salon } from '@/types/salon';
import { determineSalonCategory, getDefaultSalonImage } from '@/utils/salonImageFallbacks';

interface ValidatedSalonCardProps {
  salon: Job | Salon;
  listingType: 'salon' | 'job' | 'opportunity';
}

const ValidatedSalonCard: React.FC<ValidatedSalonCardProps> = ({ salon, listingType }) => {
  // Get the name/title depending on salon type
  const getName = () => {
    if ('name' in salon && salon.name) return salon.name;
    if ('title' in salon && salon.title) return salon.title;
    if ('company' in salon && salon.company) return salon.company;
    return 'Unnamed Salon';
  };

  // Get the image URL depending on salon type - standardized to use photo or image
  const getImageUrl = () => {
    // Always prioritize existing valid images - NEVER overwrite them
    if ('image' in salon && salon.image) 
      return salon.image;
      
    if ('photo' in salon && salon.photo) 
      return salon.photo;
      
    if ('imageUrl' in salon && salon.imageUrl) 
      return salon.imageUrl;
    
    // If no valid image exists, determine category and get appropriate image
    const category = determineSalonCategory(
      'description' in salon ? (salon.description as string || '') : '',
      getName()
    );
    
    const isPremium = 'is_featured' in salon ? !!salon.is_featured : false;
    return getDefaultSalonImage(category as any, isPremium);
  };

  // Get the formatted price with fallback
  const getFormattedPrice = () => {
    let price;
    
    if ('asking_price' in salon && salon.asking_price) {
      price = salon.asking_price;
    } else if ('price' in salon && salon.price) {
      price = salon.price;
    } else {
      return 'Contact for Price';
    }
    
    if (typeof price === 'string') {
      // If the price already has a $ sign, return it as is
      if (price.includes('$')) return price;
      // Otherwise, add the $ sign
      return `$${price}`;
    } else if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    
    return 'Contact for Price';
  };

  // Determine feature badges to display
  const getFeatureBadges = () => {
    const features = [];
    
    // Check for Vietnamese listing
    if ('is_vietnamese_listing' in salon && salon.is_vietnamese_listing) {
      features.push('Vietnamese');
    }
    
    // Check if the salon has housing
    if ('has_housing' in salon && salon.has_housing) {
      features.push('Housing');
    }
    
    // Check if the salon is featured
    if ('featured' in salon && salon.featured) {
      features.push('Featured');
    } else if ('is_featured' in salon && salon.is_featured) {
      features.push('Featured');
    }
    
    // Return the features if there are any
    return features.length > 0 ? features : null;
  };

  const features = getFeatureBadges();
  const name = getName();
  const imageUrl = getImageUrl();
  const category = determineSalonCategory(
    'description' in salon && salon.description ? salon.description : '', 
    name
  );
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <Link to={`/${listingType}s/${salon.id}`} className="block">
        <div className="aspect-video overflow-hidden relative">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            businessName={name}
            category={category}
            fallbackSrc="/images/fallback.png"
          />
          
          {features && features.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {features.map((feature, index) => (
                <Badge 
                  key={index}
                  variant={feature === 'Featured' ? 'default' : 'secondary'}
                  className={
                    feature === 'Featured' 
                      ? 'bg-amber-500 hover:bg-amber-600' 
                      : 'bg-white/80 text-gray-800'
                  }
                >
                  {feature}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{name}</h3>
        
        <div className="flex items-center text-gray-500 my-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{('location' in salon && salon.location) || 'Location unavailable'}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center font-medium text-emerald-700">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{getFormattedPrice()}</span>
          </div>
          
          <Link 
            to={`/${listingType}s/${salon.id}`} 
            className="text-primary font-medium hover:underline text-sm"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidatedSalonCard;
