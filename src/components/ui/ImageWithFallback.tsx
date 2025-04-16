
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

// Enhanced high-quality fallback images collection for different business types
const PREMIUM_FALLBACK_IMAGES = {
  // Nail salons
  nails: [
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607779097040-a6d949d494a3?q=80&w=2070&auto=format&fit=crop"
  ],
  // Hair salons
  hair: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?q=80&w=1976&auto=format&fit=crop"
  ],
  // Spas
  spa: [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"
  ],
  // Barbershops
  barber: [
    "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2070&auto=format&fit=crop"
  ],
  // Restaurants
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
  ],
  // Beauty in general
  beauty: [
    "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop"
  ],
  // Booth rentals
  booth: [
    "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=2070&auto=format&fit=crop"
  ],
  // For sale businesses
  forSale: [
    "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  ],
  // Coffee shops
  coffee: [
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop"
  ],
  // Default images (general purpose)
  default: [
    "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
  ],
  // Food-specific images
  food: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop"
  ],
  // Boba/tea shop images
  boba: [
    "https://images.unsplash.com/photo-1558857563-b371033873b8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558857792-b63ef2e96c18?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?q=80&w=2070&auto=format&fit=crop"
  ]
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src, 
  alt, 
  className = "", 
  fallbackClassName = "flex items-center justify-center bg-muted",
  businessName = "",
  fallbackImage,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [finalSrc, setFinalSrc] = useState<string | undefined>(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Enhanced business type detection based on business name
  const getBusinessTypeFromName = (name: string): string => {
    if (!name) return 'default';
    
    name = name.toLowerCase();
    
    if (name.includes('nail') || name.includes('manicure') || name.includes('pedicure')) {
      return 'nails';
    } else if (name.includes('spa') || name.includes('massage') || name.includes('facial')) {
      return 'spa';
    } else if (name.includes('hair') || name.includes('salon') || name.includes('stylist')) {
      return 'hair';
    } else if (name.includes('barber') || name.includes('cut') || name.includes('trim')) {
      return 'barber';
    } else if (name.includes('restaurant') || name.includes('café') || name.includes('cafe') || 
               name.includes('food') || name.includes('bistro') || name.includes('diner') ||
               name.includes('pho') || name.includes('sushi') || name.includes('kitchen') ||
               name.includes('bakery') || name.includes('bao')) {
      return 'restaurant';
    } else if (name.includes('booth') || name.includes('station') || name.includes('chair rental')) {
      return 'booth';
    } else if (name.includes('coffee') || name.includes('tea') || name.includes('boba')) {
      return 'coffee';
    } else if (name.includes('for sale') || name.includes('buy') || name.includes('offer') ||
               name.includes('deal') || name.includes('package') || name.includes('selling')) {
      return 'forSale';
    } else if (name.includes('tattoo') || name.includes('ink') || name.includes('piercing')) {
      return 'beauty';
    } else if (name.includes('taco') || name.includes('rice') || name.includes('roll')) {
      return 'food';
    } else if (name.includes('boba') || name.includes('tea') || name.includes('bubble')) {
      return 'boba';
    }
    
    return 'default';
  };

  // Get a random image from the appropriate category
  const getRandomImageFromCategory = (category: string): string => {
    const images = PREMIUM_FALLBACK_IMAGES[category] || PREMIUM_FALLBACK_IMAGES.default;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Determine the most appropriate fallback image based on business name or provided fallback
  const getFallbackImageUrl = (): string => {
    // Use provided fallback if it exists and is valid
    if (fallbackImage && fallbackImage.startsWith('http')) {
      return fallbackImage;
    }
    
    // Or determine based on business name
    if (businessName) {
      const businessType = getBusinessTypeFromName(businessName);
      return getRandomImageFromCategory(businessType);
    }
    
    return getRandomImageFromCategory('default');
  };

  // Reset component state when src changes
  useEffect(() => {
    if (src !== finalSrc && !fallbackAttempted) {
      setError(false);
      setLoaded(false);
      setFinalSrc(src);
    }
  }, [src, finalSrc, fallbackAttempted]);

  // Handle the case when src is null, undefined, or empty string
  useEffect(() => {
    if (!src || src === '' || src === 'null' || src === 'undefined' || !src.startsWith('http')) {
      handleImageError();
    }
  }, [src]);

  const handleImageError = () => {
    if (!fallbackAttempted) {
      console.log("Image failed to load, using fallback:", finalSrc);
      setError(true);
      setLoaded(false);
      setFinalSrc(getFallbackImageUrl());
      setFallbackAttempted(true);
    } else {
      // If fallback also fails, use the default fallback
      console.log("Fallback image also failed, using default fallback");
      setFinalSrc(getRandomImageFromCategory('default'));
    }
  };

  // Generate reliable alt text for accessibility
  const getAltText = (): string => {
    if (alt && alt !== "") return alt;
    if (businessName) return `${businessName} image`;
    return "Business listing image";
  };

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Loading state */}
      {!loaded && (
        <div className={`absolute inset-0 ${fallbackClassName} flex items-center justify-center bg-gray-100`}>
          <div className="w-12 h-12 rounded-full animate-pulse bg-gray-200"></div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={finalSrc}
        alt={getAltText()}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleImageError}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
