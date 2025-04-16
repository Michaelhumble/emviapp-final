
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  businessName?: string;
  fallbackImage?: string;
}

// Beautiful, high-quality fallback images for different salon types
const PREMIUM_FALLBACK_IMAGES = {
  default: "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&fit=crop&auto=format",
  salon: "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?q=80&w=1976&fit=crop&auto=format",
  nails: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&fit=crop&auto=format",
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&fit=crop&auto=format",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&fit=crop&auto=format",
  barber: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&fit=crop&auto=format",
  restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&fit=crop&auto=format",
  beauty: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=2070&fit=crop&auto=format",
  booth: "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?q=80&w=2070&fit=crop&auto=format",
  forSale: "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&fit=crop&auto=format",
  coffee: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&fit=crop&auto=format"
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

  // More robust business type detection based on business name
  const getBusinessTypeFromName = (name: string): string => {
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
               name.includes('food') || name.includes('bistro') || name.includes('diner')) {
      return 'restaurant';
    } else if (name.includes('booth') || name.includes('station') || name.includes('chair rental')) {
      return 'booth';
    } else if (name.includes('coffee') || name.includes('tea') || name.includes('boba')) {
      return 'coffee';
    } else if (name.includes('for sale') || name.includes('buy') || name.includes('offer')) {
      return 'forSale';
    }
    
    return 'default';
  };

  // Determine the most appropriate fallback image based on business name or provided fallback
  const getFallbackImageUrl = (): string => {
    // Use provided fallback if it exists
    if (fallbackImage) return fallbackImage;
    
    // Or determine based on business name
    if (businessName) {
      const businessType = getBusinessTypeFromName(businessName);
      return PREMIUM_FALLBACK_IMAGES[businessType] || PREMIUM_FALLBACK_IMAGES.default;
    }
    
    return PREMIUM_FALLBACK_IMAGES.default;
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
    if (!src || src === '') {
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
      setFinalSrc(PREMIUM_FALLBACK_IMAGES.default);
    }
  };

  // Generate reliable alt text for accessibility
  const getAltText = (): string => {
    if (alt && alt !== "") return alt;
    if (businessName) return `${businessName} image`;
    return "Salon listing image";
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
